import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Jumbotron() {
    return (
        <div className="jumbotron">
          <h1>20% Season Off</h1>
          <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
          </p>
          <p>
          <Button variant='primary'>Learn more</Button>
          </p>
        </div>
    )
}

export default Jumbotron;