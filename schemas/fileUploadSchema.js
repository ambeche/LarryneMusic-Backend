'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    uploadFilesOfProduct(files: Upload): FileOfProduct!
  }

  type FileOfProduct {
    cloudinaryId: String
    url: String
    mimetype: String!
    filename: String!
    encoding: String
  }
`;
