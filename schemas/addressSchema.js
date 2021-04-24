'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  type ShippingAddress {
    street: String
    city: String
    postalCode: String
    region: String
    country: String
  }

  input ShippingAddressInput {
    street: String
    city: String
    postalCode: String
    region: String
    country: String
  }
`;
