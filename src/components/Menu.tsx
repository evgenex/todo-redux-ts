import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addList, 
  deleteList, 
  selectList, 
  setCurrentList, 
  selectCurrentList
} from '../store/lists';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    activeMenu: {
      color: 'red',
    }
  }),
);

export function Menu() {
  const lists = useSelector(selectList);
  const currentList = useSelector(selectCurrentList);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [listName, setListName] = React.useState('');
  const [listIndex, setListIndex] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setListIndex(event.target.value as string);
    const listName = lists[event.target.value as number];
    console.log(listName)
    setListName(listName as string)
  };

  const getData = async () => {
    const res = await fetch('http://localhost:5000/api/lists/');
    const data = await res.json();
    data.result.map((list: any)=>
        dispatch(addList(String(list.name)))
    )
  }
  useEffect(() => {
    getData();
  });

  const createList = async () => {
    setOpenAdd(false);
    dispatch(addList(String(listName)))

    const qry = {
      name: listName,
    }

    fetch('http://localhost:5000/api/lists/insert', 
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

  const removeList = async () => {
    setOpenDelete(false);
    dispatch(deleteList(Number(listIndex)))

    const qry = {
      'name': listName,
    }

    fetch('http://localhost:5000/api/lists/delete', 
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
    <div>
      <Divider />
      <List>
        {['Important', 'Starred'].map((text, index) => (
          <ListItem button key={text} onClick={()=>{dispatch(setCurrentList(String(text)))}}>
              <ListItemIcon className={currentList===text ? classes.activeMenu : ''}>
              {index % 2 === 0 ? <InboxIcon /> : <StarIcon />}
              </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {lists.map((text, index) => (
          <ListItem button key={index} onClick={()=>{dispatch(setCurrentList(String(text)))}}>
            <ListItemIcon className={currentList===text ? classes.activeMenu : ''}>
              <TurnedInIcon />
              </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem button onClick={() => {setOpenAdd(true)}}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Add List" />
          </ListItem>
          <ListItem button onClick={() => {setOpenDelete(true)}}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary="Delete List" />
        </ListItem>
      </List>


      {/* dialogue add list */}
        <div>
        <Dialog open={openAdd} onClose={() => {setOpenAdd(false)}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type the name of the new list and click Submit.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New List"
              type="text"
              fullWidth
              onChange={(e)=>{setListName(e.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenAdd(false)}} color="primary">
              Cancel
            </Button>
            <Button onClick={createList} 
              color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* dialogue delete list */}
      <div>
        <Dialog open={openDelete} onClose={() => {setOpenDelete(false)}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Delete List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose list to delete.
            </DialogContentText>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">List</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={listIndex}
                name={listName}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {lists.map((list, index)=>(
                  <MenuItem value={index} key={index}>{list}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenDelete(false)}} color="primary">
              Cancel
            </Button>
            <Button onClick={removeList} 
              color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
