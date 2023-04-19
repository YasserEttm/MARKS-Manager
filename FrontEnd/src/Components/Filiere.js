import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Navbar from './Navbar.js'
import './Filiere.css';

const Filiere = () => {

    let emptyFiliere = {
      idFiliere: "",
      nomFiliere: "",
      modules: [
          {
              id: '',
              nomModule: "",
              elements: [
                  {
                      id: '',
                      nomElement: "",
                      coefficient: 0,
                      estValide: false,
                      modalite: [
                          {
                              id: '',
                              libele: "",
                              coefficient: 0
                          },
                          {
                              id: '',
                              libele: "",
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
              ],
              semestre: ""
          }
      ]
  };

    const [filieres, setFilieres] = useState([]);
    const [modules, setModules] = useState([]);
    const [filiereDialog, setFiliereDialog] = useState(false);
    const [deleteFiliereDialog, setDeleteFiliereDialog] = useState(false);
    const [deleteFilieresDialog, setDeleteFilieresDialog] = useState(false);
    const [filiere, setFiliere] = useState(emptyFiliere);
    const [selectedFilieres, setSelectedFilieres] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        fetch("http://localhost:8080/filiere/all")
          .then((resp) => resp.json())
          .then((data) => setFilieres(data)); // set data to state
    }, []);
    useEffect(() => {
      fetch("http://localhost:8080/module/all")
        .then((resp) => resp.json())
        .then((data) => setModules(data)); // set data to state
  }, []);

    const openNew = () => {
        setFiliere(emptyFiliere);
        setSubmitted(false);
        setFiliereDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setFiliereDialog(false);
    }

    const hideDeleteFiliereDialog = () => {
        setDeleteFiliereDialog(false);
    }

    const hideDeleteFilieresDialog = () => {
        setDeleteFilieresDialog(false);
    }

    const saveFiliere = () => {
        setSubmitted(true);
        fetch('http://localhost:8080/filiere/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(filiere)
        })
        setFiliereDialog(false);
        setFiliere(emptyFiliere);
    }

    const showInfo = (filiere) => {
        setFiliere({...filiere});
        setFiliereDialog(true);
    }


    const deleteFiliere = () => {
        let _filiere = {...filiere};
        let idFiliere = _filiere.id;
        fetch('http://localhost:8080/filiere/delete/' + idFiliere, {
        method: 'POST',
        })
        setDeleteFiliereDialog(false);
        setFiliere(emptyFiliere);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Filiere Deleted', life: 3000 });
    }

    
    const confirmDeleteSelected = () => {
        setDeleteFilieresDialog(true);
    }

    const deleteSelectedFilieres = () => {
        let _filieres = filieres.filter(val => !selectedFilieres.includes(val));
        setFilieres(_filieres);
        setDeleteFilieresDialog(false);
        setSelectedFilieres(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Filieres Deleted', life: 3000 });
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _filiere = {...filiere};
        _filiere[`${name}`] = val;
        setFiliere(_filiere);
    }



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="" className="p-button-rounded p-button-help mr-2" onClick={() => showInfo(rowData)} ><div className='mr-2'/>Info</Button>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES FILIERES</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const filiereDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveFiliere} />
        </React.Fragment>
    );
    const deleteFiliereDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFiliereDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteFiliere} />
        </React.Fragment>
    );
    const deleteFilieresDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFilieresDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedFilieres} />
        </React.Fragment>
    );
    const columns1 = [
        {field: 'nomFiliere', header: 'Nom De La Filiere', body:''}
    ];
    let i = 1;
    const columns2 = [
      {field: '', header: 'Modules Associés', body: (filieres) => filieres.modules.map((item) => { return <h5 key={item.id}><span className='col-9 badge badge-primary'>{item.nomModule.toUpperCase()+" "}</span></h5> })},
      {field: '', header: 'Elements Associés', body: (filieres) => filieres.modules.map((item) => { return item.elements.map((item) => { return <h5 key={item.id}><span className='col-9 badge badge-warning'>{item.nomElement.toUpperCase()+" "}</span></h5>})})}
  ];

  //<h5><span className='col-6 badge badge-info'>Modules</span></h5>

    const dynamicColumns1 = columns1.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable />;
    });

    const dynamicColumns2 = columns2.map((col,i) => {
      return <Column key={col.field} field={col.field} header={col.header} body={col.body} />;
  });
    
    return (
        <>
        <Navbar />
        <div className=" container datatable-crud-demo">
            <div className='d-flex justify-content-center align-center list-text mt-4 mb-4'>LISTE DES FILIERES</div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable ref={dt} value={filieres} selection={selectedFilieres} onSelectionChange={(e) => setSelectedFilieres(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} branches"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    {dynamicColumns1}
                    {dynamicColumns2}
                </DataTable>
                

            </div>

            <Dialog visible={filiereDialog} style={{ width: '450px' }} header="Filiere Details" modal className="p-fluid" footer={filiereDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <InputText id="nom" value={filiere.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !filiere.nom })} />
                    {submitted && !filiere.nom && <small className="p-error">Last Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom">Prenom</label>
                    <InputText id="prenom" value={filiere.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !filiere.prenom })} />
                    {submitted && !filiere.prenom && <small className="p-error">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="cin">Cin</label>
                    <InputText id="cin" value={filiere.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !filiere.cin })} />
                    {submitted && !filiere.cin && <small className="p-error">CIN is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteFiliereDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFiliereDialogFooter} onHide={hideDeleteFiliereDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {filiere && <span>Are you sure you want to delete <b>{filiere.nom}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteFilieresDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFilieresDialogFooter} onHide={hideDeleteFilieresDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {filiere && <span>Are you sure you want to delete the selected accounts?</span>}
                </div>
            </Dialog>
        </div>
        </>
    );
}

export default Filiere;