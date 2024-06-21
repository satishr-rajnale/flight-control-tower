
**For Running application use below command on terminal**

- npm install

  For Running application 

- node server.js

**After running application , Use Postman to send requests**

1. **To send an event:**

    Set the request type to POST.
    Set the URL to **http://localhost:3000/event.**
    Set the body to raw and Text type.
    Enter an event, for example: **F222 747 DUBLIN LONDON Re-Fuel 2021-03-29T10:00:00 200**.
   
2. **To update an event:**

    Set the request type to POST.
    Set the URL to **http://localhost:3000/update-event.**
    Set the body to raw and Text type.
    Enter an updated event, for example: **F551 747 PARIS LONDON Land 2021-03-29T12:00:00 -300**.
   
3. **To remove an event:**

    Set the request type to POST.
    Set the URL to **http://localhost:3000/remove-event.**
    Set the body to raw and Text type.
    Enter the event to remove, for example: **F551 2021-03-29T12:00:00**.
   
4. **To get the status table at a specific timestamp:**

    Set the request type to GET.
    Set the URL to **http://localhost:3000/status/2021-03-29T15:00:00.**
    Send the request and observe the response.
