import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Navbar from './Navbar.js'
import './Module.css';

const Module = () => {

    let emptyModule = {
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
    };

    const [modules, setModules] = useState([]);
    const [moduleDialog, setModuleDialog] = useState(false);
    const [module, setModule] = useState(emptyModule);
    const [selectedModules, setSelectedModules] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        fetch("http://localhost:8080/module/all")
          .then((resp) => resp.json())
          .then((data) => setModules(data)); // set data to state
    }, []);

    const openNew = () => {
        setModule(emptyModule);
        setSubmitted(false);
        setModuleDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setModuleDialog(false);
    }


    const saveModule = () => {
        setSubmitted(true);
        fetch('http://localhost:8080/module/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(module)
        })
        setModuleDialog(false);
        setModule(emptyModule);
    }

    const editModule = (module) => {
        setModule({...module});
        setModuleDialog(true);
    }

    const restart = () => {
        toast.current.show({ severity: 'info', summary: 'Password Restarted', detail: 'The password of the user has been restarted succesfully', life: 3000 });
    };
    const refreshPassword = (module) =>{
        let _module = {...module}
        const idModule = _module.id;
        fetch('http://localhost:8080/modules/restart/' + idModule, {
        method: 'POST',
        })
        restart();
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _module = {...module};
        _module[`${name}`] = val;
        setModule(_module);
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editModule(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES MODULES</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const moduleDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveModule} />
        </React.Fragment>
    );
    
    const columns = [
        {field: 'nomModule', header: 'Nom Module'},
        {field: 'semestre', header: 'Semestre'},
        {field: '', header: 'Elements Du Module', body: (modules) => modules.elements.map((item) => {return <h5><span className='col-8 badge badge-warning'>{item.nomElement+ " "}</span></h5>})},
    ];
    

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable />;
    });
    
    return (
        <>
        <Navbar />
        <div className=" container datatable-crud-demo">
            <div className='d-flex justify-content-center align-center list-text mt-4 mb-4'>LISTE DES MODULES</div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable ref={dt} value={modules} selection={selectedModules} onSelectionChange={(e) => setSelectedModules(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {dynamicColumns}
                </DataTable>
                

            </div>

            <Dialog visible={moduleDialog} style={{ width: '450px' }} header="Module Details" modal className="p-fluid" footer={moduleDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <InputText id="nom" value={module.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !module.nom })} />
                    {submitted && !module.nom && <small className="p-error">Last Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom">Prenom</label>
                    <InputText id="prenom" value={module.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !module.prenom })} />
                    {submitted && !module.prenom && <small className="p-error">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="cin">Cin</label>
                    <InputText id="cin" value={module.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !module.cin })} />
                    {submitted && !module.cin && <small className="p-error">CIN is required.</small>}
                </div>
            </Dialog>
        </div>
        </>
    );
}

export default Module;