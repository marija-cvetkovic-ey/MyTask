import { TaskDTO, TaskStatus } from "../api/dto/task.dto";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chip, Container } from "@material-ui/core";
import { TaskAPI } from "../api/task.api";

interface Props {
  data: TaskDTO;
  onTaskDelete: (taskId: number) => void;
  onTaskUpdate: (task: TaskDTO) => void;
}

const Task = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
  const deleteTask = async () => {
    await TaskAPI.deleteOne(data.id);
    onTaskDelete(data.id);
  };

  const getTaskStatus = (status: TaskStatus) => {
    let text: string = "";
    switch (status) {
      case TaskStatus.Created:
        text = "Created";
        break;
      case TaskStatus.InProgress:
        text = "In progress";
        break;
      case TaskStatus.Done:
        text = "Done";
        break;
      default:
        text = "";
        break;
    }
    return text;
  };

  const getTaskStatusColor = (status: TaskStatus) => {
    let text: string = "";
    switch (status) {
      case TaskStatus.Created:
        text = "gray";
        break;
      case TaskStatus.InProgress:
        text = "red";
        break;
      case TaskStatus.Done:
        text = "green";
        break;
      default:
        text = "";
        break;
    }
    return text;
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Title:{data.title}
        </Typography>

        <Typography variant="body2" component="p">
          Description:{data.description}
        </Typography>
        <Chip
          label={getTaskStatus(data.status)}
          style={{ backgroundColor: getTaskStatusColor(data.status) }}
        />
      </CardContent>
      <CardActions>
        <Container>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
            onClick={() => onTaskUpdate(data)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            style={{ margin: 5 }}
            onClick={deleteTask}
          >
            Delete
          </Button>
        </Container>
      </CardActions>
    </Card>
  );
};

export default Task;
