> Before starting the module design, I'd like to clarify a few points:
* Are the score calculation module and the action execution module part of the same system, or are they independent? In the case below, I will design the module to work independently, without relying on the authentication of the action execution module.
* And is the action execution system on the client side (browser, etc.) or the backend server? I will design with the assumption that the action execution module is on the backend.

Depending on the security requirements, I will design the module with two different approaches.


## 1. **Approach 1: Using JWT Token for Secure Score Update**

In this approach, the client needs to send a valid JWT token when updating the user’s score.

#### **Flow**

1. **Client Sends Action Request**:

   * The client sends a request to the server to perform an action

2. **Server Executes Action & Returns Result with JWT**:

   * The server processes the action, and upon successful execution, it returns the result of the action along with a **JWT token**. This token is valid for **10 seconds** and is used for score updates.
   * JWT token containing:
     * **userId**: the ID of the user who performed the action.
     * **issuedAt**: the timestamp when the token was generated.
     * **expiresAt**: the timestamp when the token expires (e.g., 10 seconds from `issuedAt`).
   * The server does not include action-specific data in the token. The token is only for authentication and authorization.

3. **Client Receives Result & Token**:

   * The client receives the action result along with the JWT token from the server.
   * The client then processes the result (e.g., displaying the action completion to the user) and prepares to update the score.

4. **Client Calls Score Update API**:

   * The client sends a **POST request** to the **score update API** (`/api/score/update`), including:

     * The **JWT token** in the `Authorization` header (`Authorization: Bearer <jwt-token>`).
     * The **action data** (e.g., action type, points to add, etc.) in the request body.

5. **Server Verifies JWT Token & Updates Score**:

   * The server:

     * Verifies the JWT token (checking if it's valid, not expired, and properly signed).
     * Extracts **userId** and expiration data from the token to verify the user.
     * Uses the action data from the request body (such as action type, points, etc.) to update the user's score.
   * If the token is valid, the server updates the user's score and returns a success response.


#### **API Endpoints**

* **POST** `/api/action/do-some`:

  * **Request Body**:

    ```json
    {
      "some": "<data>"
    }
    ```
  * **Response**:

    ```json
    {
      "message": "Successfully",
      "token": "<jwt-token>",
	  "result": "<action-data>"
    }
    ```

* **POST** `/api/score/update`:

  * **Request Headers**:

    ```text
    Authorization: Bearer <jwt-token>
    ```
	
  * **Request Body**:

    ```json
    {
      "data": "<action-data>"
    }
    ```
  * **Response**:

    ```json
    {
      "message": "Score updated successfully.",
      "status": "success",
	  "scoreIncrease": 10
    }
    ```

---

### 3. **Approach 2: Internal API for Score Update (Server-Side Only)**

In this approach, we do not expose an API endpoint to the client for updating scores. Instead, after the user performs an action, the action triggers an internal API call that updates the score directly on the server side.

#### **Flow**

1. **Client Sends Action Request**:

   * The client sends a request to the server to perform an action

2. **Server Executes Action**:

   * The server processes the action request and performs the required logic

3. **Server Calls Internal Score Update API**:

   * If the action is successful, the server then calls an internal **score update API** (`/api/internal/score/update`), passing the necessary data:

     * **userId**: The ID of the user performing the action.
     * **points**: The points to be added (based on the action).
     * Any other action-related data (e.g., action type).

4. **Internal Score Update API Processes the Request**:

   * The internal API verifies the request, processes the points update for the user, and stores the updated score in the system.
   * The internal API returns a success message (or any errors if they occur).

5. **Server Sends Action Result to Client**:

   * After receiving a successful response from the internal score update API, the server sends the final result back to the client.
   * The response includes:

     * **Action result**: Confirmation that the action was completed successfully.
     * **Updated score**: The new score after the points update.

#### **API Endpoints**

* **POST** `/api/internal/score/update` (Internal Use Only):

  * **Request Body**:

    ```json
    {
      "userId": "<user-id>",
      "points": 10
    }
    ```
  * **Response**:

    ```json
    {
      "message": "Score updated successfully.",
      "status": "success"
    }
    ```


* **POST** `/api/action/do-some`:

  * **Request Body**:

    ```json
    {
      "some": "<data>"
    }
    ```
  * **Response**:

    ```json
    {
      "message": "Successfully",
      "score": "<score>",
	  "result": "<action-data>"
    }
    ```


---

### 4. **Suggested Improvement**

* **Real-time Updates**: To display the leaderboard in real-time, we can consider integrating **WebSockets** or **Server-Sent Events (SSE)** to push live updates to clients without them having to refresh their page.
* **Rate Limiting**: Implement rate limiting for the `/api/score/update` endpoint to prevent abuse.
* **Logging & Monitoring**: It's important to have proper logging and monitoring in place to detect potential abuse or failures in the score updating process.
