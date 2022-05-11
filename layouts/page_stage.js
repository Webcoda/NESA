import get from "lodash.get";
import { Image, Layout, RichText, UnknownComponent } from "../components";
import { Container, makeStyles, Typography, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
}));

function SimplePage(props) {
  const classes = useStyles();
  const page = get(props, "data.page.item", null);

  const theme = useTheme();
  const imageSizes = `${theme.breakpoints.values.md}px`;

  if (!page) {
    return (
      <UnknownComponent>
        Page {get(page, "elements.system.codename", null)} does not have any
        content!
      </UnknownComponent>
    );
  }

  const title = get(page, "elements.stage.linkedItems.0.elements.title.value", null)
  const syllabuses = get(page, "elements.stage.linkedItems.0.elements.syllabuses.linkedItems", null)?.map(linkedItem => linkedItem.elements)
  console.log(get(page, "elements.stage", null));
  return (
    <Layout {...props}>
      <Container className={classes.root} maxWidth="md">
        {title && <Typography variant="h1">{title}</Typography>}

        <ul>
          {syllabuses.map((syl) => (
            <li key={get(syl, "title.value", "")}>
              {get(syl, "title.value", "")}
            </li>
          ))}
        </ul>

        <pre>{JSON.stringify(page)}</pre>
      </Container>
    </Layout>
  );
}

export default SimplePage;
