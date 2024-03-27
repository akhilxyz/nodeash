# Nodeash Server

Nodeash is a lightweight Node.js package for running servers efficiently.

## Installation

You can install Nodeash via npm:

```bash
npm install nodeash


Contributing
Contributions are welcome! If you find any issues or would like to contribute to Nodeash, please feel free to open an issue or submit a pull request on the GitHub repository.

License
This project is licensed under the MIT License - see the LICENSE file for details.


Replace `"your-username/nodeash"` in the GitHub repository link with the actual repository link where your Nodeash package is hosted.
```
# Usage
```bash
import {NodeashRoutes, ServerClient} from 'nodeash';


const register = (req, res) => {
        res.send('Register API called yo yo ');
}
// Example usage:
const userControllers = [
    {
        method: 'get',
        endpoint: '/register',
        handler:register
    },
    // Add more controllers as needed
];

const userRoutes = new NodeashRoutes();
userRoutes.initializeRoutes('/user', userControllers);


// Define a route for the controller API path

const controllers  = [userRoutes]

const server = new ServerClient({port : 3007 , baseUrl : "/test", controllers});
server.startServer();
```
