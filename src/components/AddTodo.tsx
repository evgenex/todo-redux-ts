import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AddTodo.module.css';
import { addItem } from '../store/todo';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { 
    selectCurrentList
  } from '../store/lists';

export function AddTodo() {
  const dispatch = useDispatch();
  const currentList = useSelector(selectCurrentList);

  const [todo, setTodo] = React.useState('');

  const addNewItem = async () =>{
     const newTodo = {
        id: '',
        title: todo,
        completed: false,
        list: currentList,
      };
  
      fetch('http://localhost:5000/api/todos/insert', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTodo),
        })
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 'err'){
              console.log(result)
            }else{
              newTodo.id = result.result.id;
              dispatch(addItem(Object(newTodo)));
            };
          },
        )
      setTodo('');
  }
  
  return (
    <div>
      <Paper className={styles.paper}>
        <TextField 
            id="outlined-basic" 
            label="Add todo"  
            className={styles.input} 
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}/>
        <Button 
            variant="contained" 
            color="secondary" 
            className={styles.button} 
            disableElevation
            onClick={addNewItem}
            >
            Add
        </Button>
      </Paper>
    </div>
  );
}
