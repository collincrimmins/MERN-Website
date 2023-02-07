// React
import React, {useState, useEffect, useRef, useContext} from 'react';
// Contexts
import {useAuthContext} from "../Contexts/AuthContext"
// Firebase
import {firestore} from "../firebase"
import firebase from "firebase/compat/app"

export default function Chatbox() {
    const {User} = useAuthContext()
    const [list, setList] = useState([])
    const messageRef = useRef()
    
    //const firestoreUserTodolist = firestore.collection("users").doc(User.uid).collection("todolist")

    // Get Firestore
    useEffect(() => {
        setList([
            {id: "123", text: "test", createdAt: CreatedAt, completed: true}
        ])
        // firestoreUserTodolist.orderBy("createdAt", "desc").onSnapshot(snapshot => {
        //     let newList = snapshot.docs.map(doc => {
        //         let Id = doc.id
        //         let Text = doc.data().text
        //         let CreatedAt = doc.data().createdAt
        //         let Completed = doc.data().completed
        //         return {id: Id, text: Text, createdAt: CreatedAt, completed: Completed}
        //     })
        //     //console.log(newList)
        //     setList(newList)
        // })
    }, []) 
    
    // Create Item
    const createItem = async(element) => {
        element.preventDefault()

        // Verify Input
        if (messageRef.current.value == "") {
            return
        }
        
        // Set TextField
        let txt = messageRef.current.value
        messageRef.current.value = ""

        // Send Message
        await firestoreUserTodolist.add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            text: txt,
            completed: false,
        })
        .then(function(docRef) {
            //console.log(docRef.id)
        })
        .catch(function(error) {
            console.log("Error: " + error)
        })
    }

    // Update Item Checkbox
    async function updateItemCheckbox(element) {
        const ItemId = element.target.id
        const Checked = element.target.checked
        // Update Firestore
        await firestoreUserTodolist.doc(ItemId).update({
            completed: Checked,
        })
        .then(function(docRef) {
            //console.log(docRef.id)
        })
        .catch(function(error) {
            console.log("Error: " + error)
        })
    }

    // Delete Item
    async function deleteItem(element) {
        const ItemId = element.target.id
        await firestoreUserTodolist.doc(ItemId).delete()
    }

    // Load Item
    function Item(props) {
        const {id, text, completed} = props.item
        // Setup
        return (<>
            <input type="checkbox" id={id} onChange={updateItemCheckbox} checked={completed}></input>
            {text}
            <button onClick={deleteItem} id={id}>delete</button>
            <br></br>
        </>)
    }

    return (
        <>
            <h1>List</h1>
            <div>
                {list && list.map(item => {
                    return <Item key={item.id} id={item.id} item={item} />
                })}
            </div>
            <div className="inputbox">
                <input type="text" ref={messageRef} placeholder=" Add Item..." className="textform"></input>
                <button onClick={createItem} className="sendbutton">{">>"}</button> 
            </div>
        </>
    )
}