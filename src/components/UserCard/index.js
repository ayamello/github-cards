import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600,
    marginTop: 30,
    marginLeft: 380,
    padding: 10,
  },
  media: {
    width: 100,
    height: 300,
  },
  img: {
    width: 80,
  }
});

function UserCard(data) {
  const dataUser = data.data;
  const avatarUser = dataUser.owner.avatar_url;

  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <div>
          <img className={classes.img} src={avatarUser} alt={dataUser.full_name} />
        </div>
        <CardActions>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {dataUser.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {dataUser.description}
            </Typography>
          </CardContent>
          <Button size="small" color="primary" >
            Ir para o repositório
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserCard;
