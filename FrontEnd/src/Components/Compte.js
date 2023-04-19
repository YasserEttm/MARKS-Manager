import React, { useState, useEffect, useRef} from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Navbar from './Navbar.js'
import './Compte.css';

const Compte = () => {

    let emptyCompte = {
        id: '',
        login: '',
        password: '',
        user: {
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
        }
    };
    const [comptes, setComptes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [compteDialog, setCompteDialog] = useState(false);
    const [compteAffectDialog, setCompteAffectDialog] = useState(false);
    const [deleteCompteDialog, setDeleteCompteDialog] = useState(false);
    const [deleteComptesDialog, setDeleteComptesDialog] = useState(false);
    const [compte, setCompte] = useState(emptyCompte);
    const [selectedComptes, setSelectedComptes] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loginAffected, setLoginAffected] = useState("");
    const toast = useRef(null);
    const dt = useRef(null);
    const dialogRef = useRef(null);
    

    useEffect(() => {
        fetch("http://localhost:8080/compte/all")
          .then((resp) => resp.json())
          .then((data) => setComptes(data)); // set data to state
          
        fetch("http://localhost:8080/user/noCompte")
          .then((resp) => resp.json())
          .then((data) => setUsers(data));
    }, []);

    const openNew = () => {
        //setCompte(emptyCompte);
        setSubmitted(false);
        setCompteAffectDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCompteDialog(false);
        setCompteAffectDialog(false);
    }

    const hideDeleteCompteDialog = () => {
        setDeleteCompteDialog(false);
    }

    const hideDeleteComptesDialog = () => {
        setDeleteComptesDialog(false);
    }

    const saveCompte = () => {
        setSubmitted(true);
        fetch('http://localhost:8080/compte/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(compte)
        })
        setCompteDialog(false);
        setCompte(emptyCompte);
        window.location.reload(false);
    }

    const editCompte = (compte) => {
        setCompte({...compte});
        setCompteDialog(true);
    }

    const restart = () => {
        toast.current.show({ severity: 'info', summary: 'Password Restarted', detail: 'The password of the user has been restarted succesfully', life: 3000 });
    };
    const refreshPassword = (compte) =>{
        let _compte = {...compte}
        const idCompte = _compte.id;
        fetch('http://localhost:8080/compte/restart/' + idCompte, {
        method: 'POST',
        })
        restart();
    }

    const confirmDeleteCompte = (compte) => {
        setCompte(compte);
        setDeleteCompteDialog(true);
    }

    const deleteCompte = () => {
        let _compte = {...compte};
        let idCompte = _compte.id;
        fetch('http://localhost:8080/compte/delete/' + idCompte, {
        method: 'POST',
        })
        setDeleteCompteDialog(false);
        setCompte(emptyCompte);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Compte Deleted', life: 3000 });
        window.location.reload(false);
    }

    const saveAffect = () => {
        let user = {...selectedUser};
        let log = loginAffected;
        let sendingSave = {
            login: log,
            id: user.id
        }
        fetch('http://localhost:8080/compte/save', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(sendingSave)
        })
        setCompteAffectDialog(false);
        window.location.reload(false);
        setTimeout(function(){
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Compte Affected', life: 3000 });
         }, 3000);
        
    }
    
    const confirmDeleteSelected = () => {
        setDeleteComptesDialog(true);
    }

    const deleteSelectedComptes = () => {
        let _comptes = comptes.filter(val => !selectedComptes.includes(val));
        setComptes(_comptes);
        setDeleteComptesDialog(false);
        setSelectedComptes(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comptes Deleted', life: 3000 });
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _compte = {...compte};
        let _user = {..._compte.user};
        _user[`${name}`] = val;
        _compte.user = _user;
        setCompte(_compte);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-info mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedComptes || !selectedComptes.length} />
            </React.Fragment>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-refresh" className="p-button-rounded p-button-secondary mr-2" onClick={() => refreshPassword(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editCompte(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteCompte(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">GESTION DES COMPTES</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const compteDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveCompte} />
        </React.Fragment>
    );

    const compteAffectDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAffect} />
        </React.Fragment>
    );

    const deleteCompteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCompteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCompte} />
        </React.Fragment>
    );
    const deleteComptesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteComptesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedComptes} />
        </React.Fragment>
    );

    const userOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.nom} {option.prenom}</div>
            </div>
        );
    }

    const selectedUserTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.nom} {option.prenom}</div>
                </div>
            );
        }
    
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    
    const columns = [
        {field: 'user.cin', header: 'CIN'},
        {field: 'user.nom', header: 'Nom'},
        {field: 'user.prenom', header: 'Prenom'},
        {field: 'login', header: 'Login'},
        {field: '', header: 'Role', body: (comptes) => comptes.user.type === "PR" ? <span className='col-9 badge badge-primary'>PROF</span> : <span className='col-9 badge badge-warning'>ADMIN</span>},
    ];
    

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable={col.header === 'Role' ? false : true} />;
    });
    console.log("selected user", selectedUser);
    return (
        <>
        <Navbar />
        <div className=" container datatable-crud-demo">
            <div className='d-flex justify-content-center align-center list-text mt-4 mb-4'>LISTE DES COMPTES</div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={comptes} selection={selectedComptes} onSelectionChange={(e) => setSelectedComptes(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} professors"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {dynamicColumns}
                    <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                

            </div>

            <Dialog visible={compteDialog} style={{ width: '450px' }} header="Compte Details" modal className="p-fluid" footer={compteDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom">Nom</label>
                    <InputText id="nom" value={compte.user.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !compte.user.nom })} />
                    {submitted && !compte.user.nom && <small className="p-error">Last Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenom">Prenom</label>
                    <InputText id="prenom" value={compte.user.prenom} onChange={(e) => onInputChange(e, 'prenom')} required autoFocus className={classNames({ 'p-invalid': submitted && !compte.user.prenom })} />
                    {submitted && !compte.user.prenom && <small className="p-error">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="cin">Cin</label>
                    <InputText id="cin" value={compte.user.cin} onChange={(e) => onInputChange(e, 'cin')} required autoFocus className={classNames({ 'p-invalid': submitted && !compte.user.cin })} />
                    {submitted && !compte.user.cin && <small className="p-error">CIN is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteCompteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCompteDialogFooter} onHide={hideDeleteCompteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {compte && <span>Are you sure you want to delete <b>{compte.user.nom}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteComptesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteComptesDialogFooter} onHide={hideDeleteComptesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {compte && <span>Are you sure you want to delete the selected accounts?</span>}
                </div>
            </Dialog>


            <Dialog visible={compteAffectDialog} style={{ width: '650px' }} header="Affectation Compte à Utilisateur" modal className=" p-fluid" footer={compteAffectDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="login">Taper un login : *</label>
                    <InputText id="login" value={loginAffected} onChange={(e) => setLoginAffected(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !loginAffected })} />
                    {submitted && !loginAffected && <small className="p-error">Login is required.</small>}
                </div>
                <div className='field'>
                    <label htmlFor="user">Choisir l'utilisateur : *</label>
                    <Dropdown  className='p-fluid' value={selectedUser} appendTo={dialogRef.current} options={users} onChange={(e) => setSelectedUser(e.target.value)} optionLabel="nom" valueTemplate={selectedUserTemplate} itemTemplate={userOptionTemplate} placeholder="Select a user" />
                </div>
            </Dialog>

            
        </div>
        </>
    );
}

export default Compte;