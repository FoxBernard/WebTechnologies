This project is a backend system for an event invitation application built using Node.js, Express, and MongoDB. It allows users to register, log in, create and manage events, invite other users, and interact through comments on events. The system uses session-based authentication to manage user login state and bcrypt is used to securely hash passwords before storing them in the database. Users are assigned roles which help control access to certain features such as creating events or managing content. The database is structured using MongoDB with Mongoose schemas for users, events, comments, and invitations, where relationships are created using ObjectId references.

All API endpoints were developed following REST principles and include full CRUD functionality where appropriate. Authentication middleware is used to protect routes and ensure that only logged-in users can access certain features. Additional validation and error handling have been implemented on the server side to ensure data integrity and provide meaningful responses.

The API was thoroughly tested using Bruno, which was used to simulate client requests and verify the functionality of each endpoint. This included testing user authentication, event creation and retrieval, comment operations. Overall, the project demonstrates a fully functional and secure backend system for managing events and user interactions.

All work was distributed and completed evenly by all members of the group.

Brendan, Gustavo, Igor, Guillerhme and Thomas.