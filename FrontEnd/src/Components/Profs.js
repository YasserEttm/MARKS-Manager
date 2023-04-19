import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { PickList } from 'primereact/picklist';
import Navbar from './Navbar.js'
import './Profs.css';


const Profs = () => {

    let emptyProf = {
        type: '',
        id: '',
        cin: "",
        nom: "",
        prenom: "",
        email: "",
        specialite: "",
        elements: [
            {
                id: '',
                nomElement: '',
                coefficient: 0,
                estValide: false,
                modalite: [
                    {
                        id: '',
                        libele: '',
                        coefficient: 0
                    },
                    {
                        id: '',
                        libele: "",
                        coefficient: 0
                    }
                ],
                notes: [
                    {
                        id: '',
                        noteFinal: 0
                    }
                ]
            }
        ]
    };
    
    const [profs, setProfs] = useState([]);
    const [profAffected, setProfAffected] = useState(null);
    const [sourceElement, setSourceElement] = useState([]);
    const [targetElement, setTargetElement] = useState([]);
    const [profDialog, setProfDialog] = useState(false);
    const [deleteProfDialog, setDeleteProfDialog] = useState(false);
    const [deleteProfsDialog, setDeleteProfsDialog] = useState(false);
    const [prof, setProf] = useState(emptyProf);
    const [selectedProfs, setSelectedProfs] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        fetch("http://localhost:8080/user/all")
          .then((resp) => resp.json())
          .then((data) => setProfs(data)); // set data to state
        fetch("http://localhost:8080/element/all")
          .then((resp) => resp.json())
          .then((data) => setSourceElement(data));
    }, []);

    const openNew = () => {
        setProf(emptyProf);
        setSubmitted(false);
        setProfDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProfDialog(false);
    }

    const hideDeleteProfDialog = () => {
        setDeleteProfDialog(false);
    }

    const hideDeleteProfsDialog = () => {
        setDeleteProfsDialog(false);
    }

    const saveProf = () => {
        setSubmitted(true);

        if (prof.name.trim()) {
            let _profs = [...profs];
            let _prof = {...prof};
            if (prof.id) {
                const index = findIndexById(prof.id);

                _profs[index] = _prof;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Prof Updated', life: 3000 });
            }
            else {
                _prof.id = createId();
                _profs.push(_prof);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Prof Created', life: 3000 });
            }

            setProfs(_profs);
            setProfDialog(false);
            setProf(emptyProf);
        }
    }

    const editProf = (prof) => {
        setProf({...prof});
        setProfDialog(true);
    }

    const confirmDeleteProf = (prof) => {
        setProf(prof);
        setDeleteProfDialog(true);
    }

    const deleteProf = () => {
        let _profs = profs.filter(val => val.id !== prof.id);
        setProfs(_profs);
        setDeleteProfDialog(false);
        setProf(emptyProf);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Prof Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < profs.length; i++) {
            if (profs[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    
    const confirmDeleteSelected = () => {
        setDeleteProfsDialog(true);
    }

    const deleteSelectedProfs = () => {
        let _profs = profs.filter(val => !selectedProfs.includes(val));
        setProfs(_profs);
        setDeleteProfsDialog(false);
        setSelectedProfs(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Profs Deleted', life: 3000 });
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _prof = {...prof};
        _prof[`${name}`] = val;
        setProf(_prof);
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-info mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProfs || !selectedProfs.length} />
            </React.Fragment>
        )
    }

    const affectProf = (rowData) => {
        setHidden(true);
        let _prof = {...rowData};
        setProfAffected(_prof);
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className=" p-button-rounded p-button-success mr-4" onClick={() => editProf(rowData)} />
                <Button icon="pi pi-trash" className=" p-button-rounded p-button-danger ml-3 " onClick={() => confirmDeleteProf(rowData)} />
                <Button icon="" className="col-12 p-button-rounded p-button-info mt-3" onClick={() => affectProf(rowData)} >Affect Element</Button>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES PROFESSEURS</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const profDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProf} />
        </React.Fragment>
    );
    const deleteProfDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProfDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProf} />
        </React.Fragment>
    );
    const deleteProfsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProfsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProfs} />
        </React.Fragment>
    );

    const statusBodyTemplate = (rowData) => {
        return <h5><span className="col-12 badge badge-info ">{rowData.specialite ? rowData.specialite : "Error"}</span></h5>;
    }

    const onChange = (event) => {
        setSourceElement(event.source);
        setTargetElement(event.target);
    }

    const saveElementForProf = () => {
        let _prof = {...profAffected};
        let _listElementsID = targetElement.map((element) => {return element.id})

        console.log("im the prof affected to ", _prof);
        console.log("list ElementID", _listElementsID)
        fetch('http://localhost:8080/element/affect/' + _prof.id, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(_listElementsID)
        })
        setHidden(false);
        window.location.reload(false);
    }

    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.nomElement}</h5>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">{item.estValide ? "Valide" : "Non Valide"}</h6>
                </div>
            </div>
        );
    }
    
    const columns = [
        {field: 'cin', header: 'CIN', body:''},
        {field: 'nom', header: 'Nom', body:''},
        {field: 'prenom', header: 'Prenom', body:''},
        {field: 'email', header: 'Login', body:''},
        {field: 'specialite', header: 'Specialite', body:statusBodyTemplate},
        {field: '', header: 'Elements Associés', body : (profs) => profs.elements.map((item) => {return <h5><span className='col-12 badge badge-warning'>{item.nomElement+ " "}</span></h5>})}
    ];
    //<Column key="" field="" header="Elements" sortable body = {(profs) => profs.elements.map((item) => {return item.nomElement})}/>
    

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable />;
    });
    
    return (
        <>
        <Navbar />
        <div className={hidden
            ? "d-none container datatable-crud-demo"
            : "container datatable-crud-demo"}>
            <div className= 'd-flex justify-content-center align-center list-text mt-4 mb-4'>LISTE DES PROFESSEURS</div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={profs} selection={selectedProfs} onSelectionChange={(e) => setSelectedProfs(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} professors"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {dynamicColumns}
                    <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    
                </DataTable>
            </div>

            <Dialog visible={profDialog} style={{ width: '450px' }} header="Prof Details" modal className="p-fluid" footer={profDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <InputText id="nom" value={prof.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !prof.nom })} />
                    {submitted && !prof.nom && <small className="p-error">Last Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom">Prenom</label>
                    <InputText id="prenom" value={prof.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !prof.prenom })} />
                    {submitted && !prof.prenom && <small className="p-error">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="cin">CIN</label>
                    <InputText id="cin" value={prof.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !prof.cin })} />
                    {submitted && !prof.cin && <small className="p-error">CIN is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="specialite">Specialité</label>
                    <InputText id="specialite" value={prof.specialite} onChange={(e) => onInputChange(e, 'specialite')} required autoFocus className={classNames({ 'p-invalid': submitted && !prof.specialite })} />
                    {submitted && !prof.specialite && <small className="p-error">Specialite is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteProfDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfDialogFooter} onHide={hideDeleteProfDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {prof && <span>Are you sure you want to delete <b>{prof.nom}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProfsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProfsDialogFooter} onHide={hideDeleteProfsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {prof && <span>Are you sure you want to delete the selected profs?</span>}
                </div>
            </Dialog>
        </div>
        <div className={hidden
            ? "container datatable-crud-demo"
            : "d-none container datatable-crud-demo"}>
            <div className='d-flex justify-content-center align-items-center list-text mt-4 mb-4'>
                <h4>Affectation Au Professeur</h4> <span className='mr-3'/><h4><span className='badge badge-primary '> {profAffected?.nom.toUpperCase()} {profAffected?.prenom.toUpperCase()}</span></h4> 
                </div>
            <Toast ref={toast} />
            <div className="picklist-demo">
                <div className="card">
                    <PickList source={sourceElement} target={targetElement} itemTemplate={itemTemplate} sourceHeader="Elements Disponible" targetHeader="Elements Associé"
                        sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }} onChange={onChange}
                        filterBy="name" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" />
                </div>
                <div className='d-flex justify-content-center align-items-center mt-4'>
                    <Button className='p-button-rounded p-button-outlined p-button-danger mr-3'  onClick={() => setHidden(false)} >Cancel</Button>
                    <Button className='p-button-rounded p-button-info' onClick={saveElementForProf} disabled={targetElement.length ? false : true} >Save</Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Profs;