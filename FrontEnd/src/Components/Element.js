import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Navbar from './Navbar.js'
import './Element.css';

const Element = () => {

    let emptyElement = {
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
    };

    const [elements, setElements] = useState([]);
    const [elementDialog, setElementDialog] = useState(false);
    const [element, setElement] = useState(emptyElement);
    const [selectedElements, setSelectedElements] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        fetch("http://localhost:8080/element/all")
          .then((resp) => resp.json())
          .then((data) => setElements(data)); // set data to state
    }, []);

    const hideDialog = () => {
        setSubmitted(false);
        setElementDialog(false);
    }

    const saveElement = () => {
        setSubmitted(true);
        fetch('http://localhost:8080/element/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(element)
        })
        setElementDialog(false);
        setElement(emptyElement);
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _element = {...element};
        _element[`${name}`] = val;
        setElement(_element);
    }


    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES ELEMENTS</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const elementDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveElement} />
        </React.Fragment>
    );

    const statusBodyTemplate = (rowData) => {
      return <h5><span className={`col-5 badge badge-${rowData.estValide ? "success" : "danger"}` }>{rowData.estValide ? "Validé" : "Non Validé"}</span></h5>;
    }
    
    const columns = [
      {field: 'nomElement', header: 'Nom Element'},
      {field: 'coefficient', header: 'Coefficient'},
      {field: '', header: 'Modalité', body: (elements) => elements.modalite.sort((a, b) => a.libele > b.libele ? 1 : -1).map((item) => {return  <h6><span className='col-8 badge badge-info'> {item.libele.toUpperCase()+" "}<span className="col-4 badge badge-light">{item.coefficient}</span></span></h6>}) },
    ];
    
    //" "+item.libele.toUpperCase()+":"+item.coefficient
    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable />;
    });
    
    return (
        <>
        <Navbar />
        <div className=" container datatable-crud-demo">
            <div className='d-flex justify-content-center align-center list-text mt-4 mb-4'>LISTE DES ELEMENTS</div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable ref={dt} value={elements} selection={selectedElements} onSelectionChange={(e) => setSelectedElements(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} elements"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {dynamicColumns}
                    <Column field="estValide" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    
                </DataTable>
                

            </div>

            <Dialog visible={elementDialog} style={{ width: '450px' }} header="Elements Details" modal className="p-fluid" footer={elementDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <InputText id="nom" value={element.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !element.nom })} />
                    {submitted && !element.nom && <small className="p-error">Last Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom">Prenom</label>
                    <InputText id="prenom" value={element.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !element.prenom })} />
                    {submitted && !element.prenom && <small className="p-error">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="cin">Cin</label>
                    <InputText id="cin" value={element.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !element.cin })} />
                    {submitted && !element.cin && <small className="p-error">CIN is required.</small>}
                </div>
            </Dialog>
        </div>
        </>
    );
}

export default Element;