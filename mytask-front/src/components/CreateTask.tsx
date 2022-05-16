import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { TaskDTO } from "../api/dto/task.dto";
import { TaskAPI } from "../api/task.api";

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskCreated: (task: TaskDTO) => void;
}

function getModalStyle() {
  const top = 25;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: "100%",
    marginTop: 10,
  },
  createButton: {
    width: "100%",
    marginTop: 10,
  },
}));

export const CreateTask = ({ open, handleClose, onTaskCreated }: Props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<undefined | string>(undefined);

  const createTask = async () => {
    const resp = await TaskAPI.createOne({ title, description });
    onTaskCreated(resp);
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ceate new Task</h2>
      <TextField
        placeholder="Title"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        placeholder="Description"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        color="primary"
        variant="contained"
        className={classes.createButton}
        onClick={createTask}
      >
        Create New Task
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
