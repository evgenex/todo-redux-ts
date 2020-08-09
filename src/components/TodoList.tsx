import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   addItem, 
   selectItems, 
   deleteItem, 
   checkItem,
   clearItems
  } from '../store/todo';
  import { 
    selectCurrentList
  } from '../store/lists';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginTop: '3rem',
    },
  }),
);

export function TodoList() {
  const todos = useSelector(selectItems);
  const currentList = useSelector(selectCurrentList);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const getData = async (theList: string) => {
    const res = await fetch(`http://localhost:5000/api/todos/${theList}`);
    const data = await res.json();
    dispatch(clearItems());
    data.result.map((todo: any)=>
      dispatch(addItem(Object(todo)))
    )
  }
  useEffect(() => {
    getData(currentList as string);
  }, [currentList]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const deleteTodo =(indx: number, id: number)=>{
      dispatch(deleteItem(indx))
      const qry = {
        id: id,
      }
  
      fetch('http://localhost:5000/api/todos/delete', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(qry),
        })
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 'err'){
              console.log(result)
            };
          },
        )
  }
  const checkTodo = (indx: number, id: number, checked: boolean)=>{

    console.log(checked)
      dispatch(checkItem(indx))

      const qry = {
        id: id,
        completed: !checked,
      }
  
      fetch('http://localhost:5000/api/todos/update', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(qry),
        })
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 'err'){
              console.log(result)
            };
          },
        )
  }

  return (
    <div>{todos.length > 0 && 
        <Paper>
        <List className={classes.list}>
        {todos.map((item, index) => {
            const labelId = `checkbox-list-label-${index}`;

            return (
            <ListItem key={index} role={undefined}  button onClick={handleToggle(index)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={item.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onChange={()=>{checkTodo(index, item.id, item.completed)}}
                    style={{color: 'gray'}}
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.title} />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={()=>{deleteTodo(index, item.id)}}>
                    <DeleteIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            );
        })}
        </List>
        </Paper>
        }
    </div>
  );
}
