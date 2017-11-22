import React from 'react';
import { graphql, compose } from 'react-apollo';

import $Module$EditView from '../components/$Module$EditView';

import $MODULE$_QUERY from '../graphql/$Module$Query.graphql';
import ADD_$MODULE$ from '../graphql/Add$Module$.graphql';
import EDIT_$MODULE$ from '../graphql/Edit$Module$.graphql';

class $Module$Edit extends React.Component {
  render() {
    return <$Module$EditView {...this.props} />;
  }
}

export default compose(
  graphql($MODULE$_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id }
      };
    },
    props({ data: { loading, $module$ } }) {
      return { loading, $module$ };
    }
  }),
  graphql(ADD_$MODULE$, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      add$Module$: async input => {
        try {
          const { data: { add$Module$ } } = await mutate({
            variables: { input }
          });

          if (add$Module$.errors) {
            return { errors: add$Module$.errors };
          }

          if (history) {
            return history.push('/$module$');
          }
          if (navigation) {
            return navigation.goBack();
          }
        } catch (e) {
          console.log(e.graphQLErrors);
        }
      }
    })
  }),
  graphql(EDIT_$MODULE$, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      edit$Module$: async input => {
        try {
          const { data: { edit$Module$ } } = await mutate({
            variables: { input }
          });

          if (edit$Module$.errors) {
            return { errors: edit$Module$.errors };
          }

          if (history) {
            return history.push('/$module$');
          }
          if (navigation) {
            return navigation.goBack();
          }
        } catch (e) {
          console.log(e.graphQLErrors);
        }
      }
    })
  })
)($Module$Edit);
