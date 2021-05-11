# larryne-melh-music
  
# Description
LarryneMelhMusic is a React web application for Larrynizers, Larryne Melh fan base; those who enjoy the singer's music artistry, her fashion style, and her social interests. On this platform, fans can:

* Visit the “Shop Page” where they can purchase her music records, fashion
* items or pre-order an upcoming music by the artist.
* Visit the “Fashion Page” where they can view images of her different
* fashion styles and are able to like or make comments on them.
* Have a live chat with the artist, Larryne Melh 
* Stream some music videos of the artist and make comments.
* Subscribe to be notified of upcoming tours and concerts.

**Role based authorization is implemented to grant admin-only access.**

# Users and Features
  * A Guest user can browse photos but cannot like or comment an item
  * Any user can make an order on the store - available in the backend, not yet implemented in the frontend
  * An Authenticated user can like a photo or comment on a photo but cannot upload a photo
  * Only the author of a comment can delete the comment 
  * The Admin user can access the admin panel, upload files, delete or edit content.
  

# Frameworks and Packages used in the App

## Backend
  * Express.js with Node.js
  * apollo-server-express
  * Passport.js local and jwt strategies with Jsonwebtoken for authentication
  * bcrypt
  * dotenv
  * mongoDB with Mongoose
  * Cloudinary Node.js SDK for file uploads with Graphql Upload
  * apollo-constraint-directive for server validation

## Frontend
 * React
 * Apollo-Client for React
 * apollo-upload-client
 * React Router
 * Material UI

# [Link to UI](https://larryne-music.herokuapp.com)
   **NOTE:  The front end is deployed to Heroku. Please wait for a moment for the server to wake up from sleep**: 
   - login with admin credentials [email: admin.test@larryne.com, password: test] to access and test the admin panel, upload files and edit.

# Test The GraphQl Backend
## [GraphQL API Link](https://tamanji.jelastic.metropolia.fi/graphql)

* You can test the API with Postman or preferably Firecamp, as it offers file uploads as well.
## Mutations
        mutation {
        registerUser(userInput:{email: "your email", password: "password",fullname: "name"})
        {
            
            email
            fullname 
        
        }
        }

        
        mutation{
        login(email:"admin.test@larryne.com", password:"test"){ ## or your registered credentials
            id
            fullname
            token
        }
        }

        // file uploads: Use FireCamp or the Front end with admin credentials as indicated above
        // admin credentials is required for file uploads and product modifications.
        // FireCamp also offers Authorization Header, so it can also be done with it

        mutation UploadFilesOfProduct($files: [Upload!]) {
        uploadFilesOfProduct(files: $files) {
            id
            title
            description
            tag
            published
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

        // Modify products
        // Note:  admin credentials [email: admin.test@larryne.com, password: test] required

        mutation ModifyProduct(
            $id: ID!
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
        variables:    {"id": "6099ee632b164d0a968d55b8", "title": "hot summer", "description": "looking sexy hot hot", "tag": "photo", "priority": 1, "likes": 3, "storeInfo": {"price": 25, "deliveryType": "vinyle", "orderOrPreorder": "order", "availability": true}}

            //  only admin can delete
            mutation{
            deleteProduct(id: "6099ee5d2b164d0a968d55a9")  
            }


## Any authenticated User can make comments: login required

        mutation {
        createComment(
            content: "I like coding",
            commentedItem: {commentedProductId:"6099ee632b164d0a968d55b8"}
        ){
            id
            content
            createdAt
            author{
            fullname
            
            email
            }
            commentedProducts{
            title
            id
            image{
                url
                publicId
            }
            }
            commentedComments{
            id
            content
            }
            
        }
        }

        // Modify comment: user token required

        mutation {
        modifyComment(
        id: "6090f311b6c0414243c32dca",
            content: "It's coffee o'clock, who doesn't like coffee?",
            likes: 4
        ){
            id
            content
            createdAt
            author{
            fullname
            
            email
            }
            commentedProducts{
            title
            id
            image{
                url
                publicId
            }
            }
            commentedComments{
            id
            content
            }
            
        }
        }
           
        // only the author of a comment can delete the comment; create a comment to delete
        mutation{
            deleteComment(id: "comment id")
            }

## CreateOrder Mutation
        // Create order for items in the music store: Authentication not required
        // the backend response with a transaction summary; total amount to be paid calculated

        mutation {
        createOrder(
            shippingAddress: {
            street:"siltakuja 2g"
            city:"Espoo"
            region:"Uusimaa"
            country:"Finland"
            postalCode:"00237"
            }
            deliveryDate:"1619429369245"
            estimatedDateOfDelivery:"1619429369245"
            transactionStatus: "processing"
            orderedBy:"6086cbcdabf0ed38b07ac7bf"
            orderedProducts:[{quantity:2, product:"6099ee632b164d0a968d55b8"}, {quantity:5, product:"6099ee632b164d0a968d55b8"}]
        ){
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
            orderedBy{
            fullname
            }
            orderedProducts {
            product{
                id
                image{
                url
                }
                storeInfo{
                price
                }
            }
            quantity
            }
        
        }
        }

            // createOrder mutation response example
                    {
            "data": {
                "createOrder": {
                "id": "609101ddb6c0414243c32dd3",
                "totalAmount": 175,
                "transactionType": null,
                "delivered": null,
                "shippingAddress": {
                    "street": "siltakuja 2g",
                    "city": "Espoo",
                    "region": "Uusimaa",
                    "country": "Finland",
                    "postalCode": "00237"
                },
                "deliveryDate": "1619429369245",
                "estimatedDateOfDelivery": "1619429369245",
                "transactionStatus": "processing",
                "orderedBy": null,
                "orderedProducts": [
                    {
                    "product": {
                        "id": "6090cbbe8cb0e607a6bad289",
                        "image": {
                        "url": "https://res.cloudinary.com/catt/image/upload/v1620057310/larryneMusic/still-love-u-promo.jpg"
                        },
                        "storeInfo": {
                        "price": 25
                        }
                    },
                    "quantity": 2
                    },
                    {
                    "product": {
                        "id": "6090cbbe8cb0e607a6bad289",
                        "image": {
                        "url": "https://res.cloudinary.com/catt/image/upload/v1620057310/larryneMusic/still-love-u-promo.jpg"
                        },
                        "storeInfo": {
                        "price": 25
                        }
                    },
                    "quantity": 5
                    }
                ]
                }
            }
            }

            
            // only Admin is authorized to edit orders: [email: admin.test@larryne.com, password test]
            mutation {
            modifyOrder(
                id: "6099e73cd6241d21845bf0e7"
                delivered:true
                deliveryDate:"1619429369245"
                transactionStatus: "processing"
                shippingDetails: "address line2: Kasityolaisentie 17, Helsinki"
            ){
                id
                totalAmount
                transactionType
                delivered
                shippingDetails
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
                orderedBy{
                fullname
                }
                orderedProducts {
                product{
                    id
                    image{
                    url
                    }
                    storeInfo{
                    price
                    }
                }
                quantity
                }
            
            }
            }

## Queries 

* products

            {
            products( filter:{key: "published", value: false}, sortby: "-likes", max: 3){
                    id
                    title
                    description
                    tag
                    priority
                    likes
                    image{
                    url
                    publicId
                    responsiveBreakpoints
                    }
                    
                    
                comments{
                    id
                    content
                    likes
                    
                }
                }
            }

            // server response

                        {
            "data": {
                "products": [
                {
                    "id": "6090cbbe8cb0e607a6bad289",
                    "title": "hot summer",
                    "description": "looking sexy hot hot",
                    "tag": "photo",
                    "priority": 1,
                    "likes": 3,
                    "image": {
                    "url": "https://res.cloudinary.com/catt/image/upload/v1620057310/larryneMusic/still-love-u-promo.jpg",
                    "publicId": "larryneMusic/still-love-u-promo",
                    "responsiveBreakpoints": [
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_1000/v1620057310/larryneMusic/still-love-u-promo.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_819/v1620057310/larryneMusic/still-love-u-promo.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_553/v1620057310/larryneMusic/still-love-u-promo.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_200/v1620057310/larryneMusic/still-love-u-promo.jpg"
                    ]
                    },
                    "comments": []
                },
                {
                    "id": "6090cbbe8cb0e607a6bad28a",
                    "title": "Larryne",
                    "description": null,
                    "tag": "photo",
                    "priority": 2,
                    "likes": null,
                    "image": {
                    "url": "https://res.cloudinary.com/catt/image/upload/v1620102075/larryneMusic/larryne.jpg",
                    "publicId": "larryneMusic/larryne",
                    "responsiveBreakpoints": [
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_1000/v1620102075/larryneMusic/larryne.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_854/v1620102075/larryneMusic/larryne.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_648/v1620102075/larryneMusic/larryne.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_200/v1620102075/larryneMusic/larryne.jpg"
                    ]
                    },
                    "comments": []
                },
                {
                    "id": "6090cbbe8cb0e607a6bad28b",
                    "title": "more pink",
                    "description": null,
                    "tag": "photo",
                    "priority": 2,
                    "likes": null,
                    "image": {
                    "url": "https://res.cloudinary.com/catt/image/upload/v1620057313/larryneMusic/more%20pink.jpg",
                    "publicId": "larryneMusic/more pink",
                    "responsiveBreakpoints": [
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_1000/v1620057313/larryneMusic/more%20pink.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_827/v1620057313/larryneMusic/more%20pink.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_571/v1620057313/larryneMusic/more%20pink.jpg",
                        "https://res.cloudinary.com/catt/image/upload/c_fill,g_auto/c_scale,w_200/v1620057313/larryneMusic/more%20pink.jpg"
                    ]
                    },
                    "comments": []
                }
                ]
            }
            }


* product by id

                {
                product( id: "6099ee632b164d0a968d55b8"){
                        id
                        title
                        description
                        tag
                        priority
                        likes
                        image{
                        url
                        publicId
                        responsiveBreakpoints
                        }
                        
                        
                    comments{
                        id
                        content
                        likes
                        
                    }
                    }
                }

* comments with filter params

                {
                comments(dateRange: {earlier: "1619347602997", later: "1620112145379"}){
                    id
                    content
                    createdAt
                    likes
                    author{
                    fullname
                    id
                    email
                    }
                    commentedProducts{
                    title
                    id
                    image{
                        url
                        publicId
                    }
                    }
                    
                }
                }

* User : only the currently authenticated user can query

                {
                user{
                    email
                    fullname
                }
                }

                // example result

                {
                "data": {
                    "user": {
                    "email": "admin.test@larryne.com",
                    "fullname": "admin"
                    }
                }
                }

* Orders : Admin Access Only : [email: admin.test@larryne.com, password: test]

                {
                orders(orderDate: "1619429369290"){
                    id
                    totalAmount
                    transactionType
                    delivered
                    shippingDetails
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
                    orderedBy{
                    fullname
                    }
                    orderedProducts {
                    product{
                        id
                        image{
                        url
                        }
                        storeInfo{
                        price
                        }
                    }
                    quantity
                    }
                
                }
                }

## Installation
                git clone https://gitlab.metropolia.fi/tamanjic/larryne-melh-music.git
                cd larryne-melh-music
                npm install
                npm start

## Voila, that's it!

