import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

function Home() {
    return (
        <div>
            <Button variant='primary' onClick={() => {
                axios.get('/api/siteuser/getid')
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
            }}>Check</Button>
        </div>
    );
}

export default Home;