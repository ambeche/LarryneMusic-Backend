import { gql } from '@apollo/client';

export const PRODUCTS = gql`
query products($filter: FilterInput, $sortby: String) {
  products(filter: $filter, sortby: $sortby) {
    id
    title
    description
    tag
    priority
    published
    likes
    numberOfComments
    image {
      url
      publicId
      responsiveBreakpoints
    }
    storeInfo {
      price
  available
  quantitySold
  orderOrPreorder
  deliveryType
    }
    comments {
      id
      author{
        fullname
        email
      }
      content
      likes
    }
  }
}
`;
export const PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      title
      description
      published
      tag
      priority
      likes
      numberOfComments
      image {
        url
        publicId
        responsiveBreakpoints
      }
      storeInfo {
        price
    available
    quantitySold
    orderOrPreorder
    deliveryType
      }
      comments {
        id
        author{
          fullname
          email
        }
        content
        likes
      }
    }
  }
`;
export const EDIT_NUMBER = gql`
  query {
    comments {
      id
      content
      createdAt
      likes
      author {
        fullname
        id
        email
      }
      commentedProducts {
        title
        id
        image {
          url
          publicId
        }
      }
    }
  }
`;
export const USER = gql`
  query {
    user {
      id
      email
      role
      roleValue
      fullname
    }
  }
`;
