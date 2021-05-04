# larryne-melh-music

# Description
LarryneMelhMusic is a React web application for Larrynizers, Larryne Melh fan base; those who enjoy the singer's music artistry, her fashion style, and her social interests. On this platform, fans can:

Visit the “Shop Page” where they can purchase her music records, fashion
items or pre-order an upcoming music by the artist.
Visit the “Fashion Page” where they can view images of her different
fashion styles and are able to like or make comments on them.
Have a live chat with the artist, Larryne Melh
Stream some music videos of the artist and make comments.
Subscribe to be notified of upcoming tours and concerts.

# [Front-end](https://tamanji.jelastic.metropolia.fi/)
 *NOTE:  Due to crashes and bugs, the front end is incomplete: 
   - login with admin credentials [email: admin.test@larryne.com, password: test] to access and test the admin panel, upload files and edit.

# Test The GraphQl Backend
## [API Link](https://tamanji.jelastic.metropolia.fi/graphql)

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
    login(email:"admin.test@larryne.com", password:"test"){ // or your registered credentials
        id
        fullname
        token
    }
    }
