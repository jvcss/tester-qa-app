import express from 'express';
import Mocha from 'mocha';
import * as chai from 'chai';

export function configureRoutes(app: express.Express): void {
  // Define your API routes here
  app.get('/api/tests', (req, res) => {
    // Implement endpoint to get a list of tests to manage the whole possible test
    res.send('Hello, /api/tests !');
  });

  app.post('/api/tests', (req, res) => {
    res.send('Hello, /api/tests !');
    // Implement endpoint to create a new test as object
  });

  app.get('/api/tests/:testId/steps', (req, res) => {
    res.send('Hello, /api/tests/:testId/steps !');
    // Implement endpoint to get steps for a specific test
  });

  app.post('/api/tests/:testId/steps', (req, res) => {
    res.send('Hello,  /api/tests/:testId/steps !');
    // Implement endpoint to create a new step for a test
  });
  app.post('/api/run-tests', (req, res) => {
    // Run your Mocha tests here
    // Create a new Mocha instance
    const mocha = new Mocha({
      reporter: 'spec', // You can choose a different reporter if needed
    });

    mocha.addFile('src/test/testFile.spec.ts');

    mocha.run((failures: number) => {
      if (failures > 0) {
        res.status(500).send(`Tests failed: ${failures}`);
      } else {
        res.send('All tests passed');
      }
    });
  });

}
