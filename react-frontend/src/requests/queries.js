import { gql } from '@apollo/client';

export const PRODUCTS = gql`
query products($filter: FilterInput) {
  products(filter: $filter) {
    id
    title
    description
    tag
    priority
    published
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
