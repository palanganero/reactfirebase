
import React from 'react';
//import db from "./firebase";
//import {app} from './firebase'
//import  firebase  from "./firebase";
import {auth,db} from './firebase';
//import {auth} from './firebase'
//import {db} from './firebase';



import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
}from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';  


  function App() {

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
    const [categorias, setCategorias] = React.useState([])
    const [categoria, setCategoria] = React.useState([])
    //const [categoria, setCategoria] = React.useState([categorias.docs[0].data().nombre])

    const [email, setEmail] = React.useState('prueba@prueba.com')
    const [pass, setPass] = React.useState('123123')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(false)
  
  React.useEffect(() => {

    const obtenerDatos = async () => {

      try {

        //const artRef = collection(db, "Articulos")
        //let artRef = db.collection('Articulos');
        //console.log(artRef)
        //const arrayData = await artRef.getDocs();
        //const docRef = doc(db, "Articulos");
        //const arrayData = await getDoc(docRef);
        
        //const snapshot = await db.collection('Articulos').get()
        //console.log(snapshot.docs.map(doc => doc.data()))

        /*
        for(const doc of arrayData.docs){
          console.log(doc.id, '=>', doc.data());
        }*/
        /*
        const querySnapshot = await db.getDocs(collection(db, "Articulos"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        })*/
        
        const querySnapshot = await getDocs(collection(db,"Articulos"));
        querySnapshot.forEach((doc) => {
       
        });
        
        const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id,titulo:doc.data().titulo ,contenido:doc.data().contenido}))
        setTareas(arrayData)
      
        
      } catch (error) {
        console.log(error)}
    }
  
    const obtenerCategorias = async () => {

      try {


        const querySnapshot = await getDocs(collection(db,"Categorias"));
        querySnapshot.forEach((doc) => {
       
        });
        const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id,nombre:doc.data().nombre}))
        setCategorias(arrayData)
      } catch (error) {
        console.log(error)
      }
      
    }

    obtenerDatos()
    obtenerCategorias()
    
  }, [])

  

  const agregar = async (e) => {
    e.preventDefault()

    if(!tarea.trim()){
      console.log('está vacio')
      return
    }

    try {

      const nuevaTarea = {
        titulo: "tarea",
        contenido: "categoria"
      }
      const docRef = await addDoc(collection(db,"Articulos"), {titulo:tarea,contenido:categoria});

      setTareas([
        ...tareas,
        {titulo:tarea,contenido:categoria, id: docRef.id}

      ])

      setTarea('')
      
    } catch (error) {
      console.log(error)
    }


  }

  const eliminar = async (id) => {
    try {
      

      const articleToDelete = doc(db,`Articulos/${id}`)
      db.deleteDoc(articleToDelete)

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'Articulos', id)
    try{
      await updateDoc(taskDocRef, {
        titulo: tarea,
        contenido: categoria
      })
    
      const querySnapshot = await getDocs(collection(db,"Articulos"));
        querySnapshot.forEach((doc) => {
          
       
        });
        const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id,titulo:doc.data().titulo ,contenido:doc.data().contenido}))
        setTareas(arrayData)

      setModoEdicion(false)
      setTarea('')
      setId('')

    } catch (err) {
      alert(err)
    }    
  }
  //const Login = (props) => {



    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim() || !pass.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }
        if(pass.length < 6){
            console.log('6 o más carácteres')
            setError('6 o más carácteres en pass')
            return
        }
        console.log('correcto...')
        setError(null)

        if(esRegistro){
            registrar()
        }else{
            login()
        }

    }

    //const login = React.useCallback(async () => {
      function login(){
      signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    //}, [email, pass, props.history])
    //}, [])
      }

      function registrar(){
    //const registrar = React.useCallback(async() => {

      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    //}, [email, pass, props.history])
    //}, [])
      }
  //}
  
  //const CuadroTexto = ({ titulo }) => <input type="text" id="fname" name="fname" value={titulo}/>

  function cerrar(){
    signOut(auth).then(() => {
      console.log("deslogeado")
    }).catch((error) => {
      console.log("error")
    });
  }

  return (
    <div className="container mt-3">
      <div className="row">
      <div className="col-md-6">
          <h3>Lista de tareas</h3>
          <table border="1">

            {
              tareas.map(item => (
                
                  <tr>
                    
                  <td>{item.titulo}</td>
                  <td>{item.contenido}</td>
                  <td>
                  <button 
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >                
                    Eliminar
                  </button>
                  </td>
                  <td>
                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                  </td>
                
                  </tr>
                
              ))
            }

          </table>
        </div>
        
        
<div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={modoEdicion ? handleUpdate : agregar}>
            <input 
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <select 
            onChange={c => setCategoria(c.target.value)} value={categoria}>
                    {
                     
                    categorias.map(item2 => (
                    <option 
                    value={item2.nombre}
                    >
                      {item2.nombre}
                      </option>
                    ))
                    }
            </select>
            <button 
              className={
                modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              }
              type="submit"
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
            
          </form>
        </div> 
        
        <h3 className="text-center">
                {
                    esRegistro ? 'Registro' : 'Login'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {esRegistro ? 'Registrar' : 'Acceder'}
                        </button>
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="button"
                            onClick={() => cerrar()}
                        >
                            Logout
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                        </button>
                    </form>
                </div>
            </div>
      </div>
    </div>
    
  );
}

export default App;