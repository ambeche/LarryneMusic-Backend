'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    uploadFilesOfProduct(files: [Upload!]): [Product!]
  }
`;
