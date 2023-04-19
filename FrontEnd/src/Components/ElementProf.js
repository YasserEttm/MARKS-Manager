import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import NavbarProf from "./NavbarProf.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./Element.css";
import { Toolbar } from "primereact/toolbar";

function ElementProf() {
  let emptyElement = {
    id: "",
    nomElement: "",
    coefficient: 0,
    estValide: false,
    modalite: [
      {
        id: "",
        libele: "",
        coefficient: 0,
      },
      {
        id: "",
        libele: "",
        coefficient: 0,
      },
      {
        id: "",
        libele: "",
        coefficient: 0,
      },
    ],
    notes: [
      {
        id: "",
        noteFinal: 0,
        noteProjet: 0,
        noteCc: 0,
        noteTp: 0,
      },
    ],
  };

  const logger = useContext(UserContext);
  const [element, setElement] = useState(emptyElement);
  const [selectedElements, setSelectedElements] = useState(null);
  const [selectedNotesElement, setSelectedNotesElement] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [elements, setElements] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notesElement, setNotesElement] = useState([]);
  const toast = useRef(null);
  const dt = useRef(null);

//   useEffect(() => {
//     setElements(() =>
//       logger.user.elements.map((item) => {
//         return item;
//       })
//     );
//     fetch("http://localhost:8080/note/all")
//       .then((resp) => resp.json())
//       .then((data) => setNotes(data));
//   }, [logger.user.elements]);


  useEffect(() => {
    if(elements) {
        fetch("http://localhost:8080/user/all")
        .then((resp) => resp.json())
        .then((data) => data)
        .then((data) => data.find((item) => item.id === logger.user.id))
        .then((data) => setElements(data.elements));
    }
    else{
        setElements(() =>
        logger.user.elements.map((item) => {
        return item;
        })
    );
    }
    fetch("http://localhost:8080/note/all")
      .then((resp) => resp.json())
      .then((data) => setNotes(data));
  }, [logger.user.elements]);

  console.log(notes);

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">GESTION DES ELEMENTS</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const headerNotes = (
    <div className="table-header">
      <h5 className="mx-0 my-1">GESTION DES NOTES </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const editNote = (rowData) => {
    setHidden(true);
    setElement(rowData);
    let _notesElement = notes.filter((item) => { return item.element.id === rowData.id }).map((item) => item);
    setNotesElement(_notesElement);
  };
  console.log(notesElement);


  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="mr-2 pi pi-arrow-up-right"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => editNote(rowData)}
        >
          Notes
        </Button>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <h5>
        <span
          className={`col-5 badge badge-${
            rowData.estValide ? "success" : "danger"
          }`}
        >
          {rowData.estValide ? "Validé" : "Non Validé"}
        </span>
      </h5>
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
    event.preventDefault();
  };



  const cellEditor = (options) => {
    return textEditor(options);
  };


  const textEditor = (options) => {
    //console.log("im the value", options.value);
    return (
      <InputText
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        autoFocus
        mode="decimal"
        disabled={(element.estValide || options.value === 0 || options.field === "noteFinal") ? true : false}
      />
    );
  };


  const columns = [
    { field: "nomElement", header: "Nom Element" },
    { field: "coefficient", header: "Coefficient" },
    {
      field: "",
      header: "Modalité",
      body: (elements) =>
        elements.modalite
          .sort((a, b) => (a.libele > b.libele ? 1 : -1))
          .map((item) => {
            return (
              <h6 key={item.id}>
                <span className="col-8 badge badge-info">
                  {" "}
                  {item.libele.toUpperCase() + " "}
                  <span className="col-4 badge badge-light">
                    {item.coefficient}
                  </span>
                </span>
              </h6>
            );
          }),
    },
  ];


  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable
      />
    );
  });

  const columnsEtudiants = [
    {
        field: "code",
        header: "Code",
        body : (notesElement) => notesElement.etudiant.code
    },
    {
        field: "nom",
        header: "Nom",
        body : (notesElement) => notesElement.etudiant.nom
    },
    {
        field: "prenom",
        header: "Prenom",
        body : (notesElement) => notesElement.etudiant.prenom
    },
  ];

  const dynamicColumnsEtudiants = columnsEtudiants.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable
      />
    );
  });


  const saveBrouillon = () =>{
    console.log("after save ", notesElement);
    let coef1 = element.modalite.find((item) => item.libele === "cc" ? item.coefficient : null)
    let coef2 = element.modalite.find((item) => item.libele === "tp" ? item.coefficient : null)
    let coef3 = element.modalite.find((item) => item.libele === "projet" ? item.coefficient : null)
    console.log("coef1", coef1);
    console.log("coef2", coef2);
    console.log("coef3", coef3);
    //let _noteFinal = ((item.noteCc * coef1.coefficient) + (item.noteProjet * coef3.coefficient) + (item.noteTp * coef2.coefficient)) / 3
    notesElement.map((item) => item.noteFinal = ( (item.noteCc * (coef1 ? coef1.coefficient : 0)) + (item.noteTP * (coef2 ? coef2.coefficient : 0)) + (item.noteProjet * (coef3 ? coef3.coefficient : 3)) ).toFixed(2) ) 
    console.log("hhhhh", notesElement);
    fetch('http://localhost:8080/note/saveNotes', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(notesElement)
    })
    //window.location.reload(false);
  }


  const valideNotesElement = () =>{
    let _element = {...element};
    _element.estValide = true;
    let newUpdated = {
        id: _element.id,
        estValide: true
    }
    setElement(_element);
    fetch('http://localhost:8080/element/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newUpdated)
    })
    window.location.reload(false);
  }

  const returnToElements = () => {
    setHidden(false);
  }

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Sauvegarder" icon="pi pi-save" className=" p-button-rounded p-button-success mr-2" disabled={element.estValide ? true : false} onClick={saveBrouillon} />
            <Button label="Validé Element" icon="pi pi-check-circle" className="p-button-rounded p-button-primary" disabled={element.estValide ? true : false} onClick={valideNotesElement} />
        </React.Fragment>
    )
}

  
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Liste Des Elements" icon="pi pi-arrow-left" className="p-button-rounded p-button-info" onClick={returnToElements} />
            </React.Fragment>
        )
    }

    const bodyNoteFinal = (rowData) =>{
        return (
            <span className="badge badge-primary">{rowData.map((item) => item.noteFinal)}</span>
        )
      }

  const columnsNotes = [
    {
        field: "noteCc",
        header: "Note CC",
    },
    {
        field: "noteTP",
        header: "Note TP",
    },
    {
        field: "noteProjet",
        header: "Note Projet",
    },
    {
        field: "noteFinal",
        header: "Note Final",
        
    },

  ];
  


  // {element?.modalite?.map((item) => <Column header={item.libele.toUpperCase()} field={item.libele} body={notesElement.map((note) => item.libele === "cc"? note.noteCc : item.libele === "projet" ? note.noteProjet : item.libele === "tp" ? note.noteTp : null )}></Column>)}


  const dynamicColumnsNotes = columnsNotes.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        editor={(options) => cellEditor(options)}
        onCellEditComplete={onCellEditComplete}
        sortable
      />
    );
  });

  //{etudiants.map((item) => {return item.notes.map((item) => {return <Column key={item.id} header="Note Final" body={<h4><span className='badge badge-primary'>{item.noteFinal+".00"}</span></h4>} exportable={false} style={{ minWidth: '8rem' }}></Column>})})}

  return (
    <div>
      <NavbarProf />
      <div
        className={
          hidden
            ? "d-none container datatable-crud-demo"
            : "container datatable-crud-demo"
        }
      >
        <div className="d-flex justify-content-center align-center list-text mt-4 mb-4">
          LISTE DES ELEMETS
        </div>
        <Toast ref={toast} />
        <div className="card">
        
          <DataTable
            ref={dt}
            value={elements}
            selection={selectedElements}
            onSelectionChange={(e) => setSelectedElements(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} elements"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              exportable={false}
            ></Column>
            {dynamicColumns}
            <Column
              field="estValide"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              header="Actions"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>




      <div
        className={
          hidden
            ? "container datatable-crud-demo"
            : " d-none container datatable-crud-demo"
        }
      >
        <div className="d-flex justify-content-center align-center list-text mt-4 mb-4">
          NOTES DES ETUDIANTS POUR {element.nomElement.toUpperCase()}
        </div>
        <Toast ref={toast} />
        <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            value={notesElement}
            selection={selectedNotesElement}
            onSelectionChange={(e) => setSelectedNotesElement(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
            globalFilter={globalFilter}
            header={headerNotes}
            responsiveLayout="scroll"
            
          >
            {dynamicColumnsEtudiants}
            {dynamicColumnsNotes}

          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default ElementProf;
