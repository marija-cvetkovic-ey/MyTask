import {
  Button,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { TaskDTO, TaskStatus } from "../api/dto/task.dto";
import { TaskAPI } from "../api/task.api";

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskUpdated: (task: TaskDTO) => void;
  data: TaskDTO | undefined;
}

function getModalStyle() {
  const top = 50;
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

export const EditTask = ({ open, data, handleClose, onTaskUpdated }: Props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(TaskStatus.Created);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    }
  }, [data]);

  const updateTask = async () => {
    if (data) {
      const resp = await TaskAPI.updateOne(data.id, {
        title,
        description,
        status,
      });
      onTaskUpdated(resp);
    }
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update Task</h2>

      <TextField
        placeholder="Title"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        placeholder="Description"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className={classes.textField}
      >
        <MenuItem value={TaskStatus.Created}>Created</MenuItem>
        <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
        <MenuItem value={TaskStatus.Done}>Done</MenuItem>
      </Select>
      <Button
        color="primary"
        variant="contained"
        className={classes.createButton}
        onClick={updateTask}
      >
        Update Task
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
