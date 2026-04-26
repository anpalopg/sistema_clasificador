from config import GENERAL_CONTROLLER_URL 


class BackendService:


    def __init__(self, client):

        self.client = client


    async def forward(self, request, path: str):

    
        headers = dict(request.headers)
     
        headers.pop("host", None)

   
        print("URL", f"{GENERAL_CONTROLLER_URL}/{path}")
        response =  await self.client.request(
            method=request.method,  # Maintain the original HTTP method
            url=f"{GENERAL_CONTROLLER_URL}/{path}",  # Build the backend URL
            headers=headers,  # Send the processed headers
            content=await request.body(),  # Forward the request body
            params=request.query_params,  # Maintain the query parameters
        )
        return response
