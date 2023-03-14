# [Typedoc Documentation Website](https://sudokuru.github.io/Backend/)<br>

# Todo

- [ ] Add license file and distribute to all repos using GitHub Action (Thomas)
- [ ] Finish writing integration tests for puzzle endpoint (Thomas)
- [ ] Write GitHub hook to run all tests before Push to repo (Thomas)
- [x] Set up Dev and Prod Lambda environments (Thomas/Gregory)
- [ ] Add Mermaid documentation and distribute to all repos using GitHub Action (Thomas)
- [ ] Clean up docker implementation (auto-rebuild) (Thomas)
- [ ] Display integration test results with reporter (Thomas)
- [ ] Decide on initial JSON structure for remaining endpoints (Team)
- [ ] Write logic for remaining endpoints (Daniel)
- [ ] Write sanitation and validation for remaining endpoints (Daniel)
- [ ] Write Postman integration tests for remaining endpoints (Daniel)
- [ ] Set up Auth0 token authentication (Thomas/Daniel)
- [ ] Write up OpenAPI specifications for endpoints (Thomas/Daniel)
- [ ] Resolve remaining ```//todo``` items (Thomas/Daniel)
- [ ] Determine how to set Prod environment to use versioning control (Thomas/Gregory)
- [ ] Implement unit tests if needed (Thomas/Daniel)

# Developer Setup

1. Install Docker on your machine. Tutorial is linked below:<br>
   [![Docker Tutorial](https://img.youtube.com/vi/2ezNqqaSjq8/0.jpg)](https://www.youtube.com/watch?v=2ezNqqaSjq8)<br>
2. Once docker is installed, the Mongo image can be run with this command:<br>
running the command<br>
```console
npm run docker
```
3. The app can then be run with the command:<br>
```console
npm run start
```
4. Integration tests can be run when the app is running with this command:<br>
```console
npm run test:integration
```

