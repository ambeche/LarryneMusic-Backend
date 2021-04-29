import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query {
    products(sortby: "-likes") {
      id
      title
      description
      tag
      priority
      likes
      image {
        url
        publicId
        responsiveBreakpoints
      }
      comments {
        id
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
      tag
      priority
      likes
      image {
        url
        publicId
        responsiveBreakpoints
      }
      comments {
        id
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

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      fullname
      token
    }
  }
`;
