import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($userInput: UserInput!) {
    registerUser(userInput: $userInput) {
      id
      email
      fullname
    }
  }
`;

export const UPLOAD_FILES_OF_PRODUCT = gql`
  mutation uploadFilesOfProduct($files: [Upload!]) {
    uploadFilesOfProduct(files: $files)  {
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
        content
        likes
      }
    }
  }
`;

export const MODIFY_PRODUCT = gql`
  mutation ModifyProduct(
    $id: ID!
    $published: Boolean
    $title: String
    $description: String
    $tag: String
    $priority: Int
    $storeInfo: StoreInfoInput
    $likes: Int
  ) {
    modifyProduct(
      id: $id
      title: $title
      published: $published
      description: $description
      tag: $tag
      priority: $priority
      storeInfo: $storeInfo
      likes: $likes
    ) {
      id
      title
      description
      tag
      priority
      likes
      numberOfComments
      updatedAt
      image {
        url
        publicId
        responsiveBreakpoints
      }
      storeInfo {
        price
        orderOrPreorder
        quantitySold
        available
        deliveryType
        orders {
          id
          shippingDetails
        }
      }
      comments {
        id
        content
        likes
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($content: String!, $commentedItem: CommentItemInput!) {
    createComment(content: $content, commentedItem: $commentedItem) {
      id
      content
      createdAt
      author {
        fullname
      }
      commentedProducts {
        title
        id
        image {
          url
          publicId
        }
      }
      commentedComments {
        id
        content
        likes
      }
    }
  }
`;

export const MODIFY_COMMENT = gql`
  mutation createComment($content: String!, $commentedItem: CommentItemInput!) {
    modifyComment(content: $content, commentedItem: $commentedItem) {
      id
      content
      createdAt
      author {
        fullname
      }
      commentedProducts {
        title
        id
        image {
          url
          publicId
        }
      }
      commentedComments {
        id
        content
        likes
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder(
    $transactionStatus: String!
    $shippingAddress: ShippingAddressInput
    $deliveryDate: String
    $estimatedDateOfDelivery: String
    $orderedBy: ID
    $orderedProducts: [ItemTypeInput!]
  ) {
    createOrder(
      shippingAddress: $shippingAddress
      deliveryDate: $deliveryDate
      estimatedDateOfDelivery: $estimatedDateOfDelivery
      transactionStatus: $transactionStatus
      orderedBy: $orderedBy
      orderedProducts: $orderedProducts
    ) {
      id
      totalAmount
      transactionType
      delivered
      shippingAddress {
        street
        city
        region
        country
        postalCode
      }
      deliveryDate
      estimatedDateOfDelivery
      transactionStatus
      orderedBy {
        fullname
      }
      orderedProducts {
        product {
          id
          image {
            url
          }
          storeInfo {
            price
          }
        }
        quantity
      }
    }
  }
`;
export const MODIFY_ORDER = gql`
  mutation modifyOrder(
    $id: ID!
    $transactionStatus: String!
    $shippingAddress: ShippingAddressInput
    $deliveryDate: String
    $estimatedDateOfDelivery: String
    $orderedBy: ID
    $orderedProducts: [ItemTypeInput!]
  ) {
    modifyOrder(
      id: $id
      shippingAddress: $shippingAddress
      deliveryDate: $deliveryDate
      estimatedDateOfDelivery: $estimatedDateOfDelivery
      transactionStatus: $transactionStatus
      orderedBy: $orderedBy
      orderedProducts: $orderedProducts
    ) {
      id
      totalAmount
      transactionType
      delivered
      shippingAddress {
        street
        city
        region
        country
        postalCode
      }
      deliveryDate
      estimatedDateOfDelivery
      transactionStatus
      orderedBy {
        fullname
      }
      orderedProducts {
        product {
          id
          image {
            url
          }
          storeInfo {
            price
          }
        }
        quantity
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      fullname
      role
      roleValue
      token
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!){
    deleteComment(id: $id)
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!){
    deleteProduct(id: $id)
  }
`
