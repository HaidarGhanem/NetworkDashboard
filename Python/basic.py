import requests
import json

# Define GNS3 server details
server_url = 'http://localhost:3080'
username = 'admin'
password = 'password'  # Fill in your GNS3 password

# Authenticate with the GNS3 server
auth_url = f'{server_url}/v2/auth'
auth_data = {"username": username, "password": password}
response = requests.post(auth_url, json=auth_data)

try:
    response_data = response.json()
    auth_token = response_data.get("token")

    if auth_token:
        # Fetch data from the GNS3 server
        devices_url = f'{server_url}/v2/projects/default/nodes'
        headers = {"Authorization": f"Bearer {auth_token}"}
        devices_response = requests.get(devices_url, headers=headers)
        devices_data = devices_response.json()

        # Print the data or store it in a JSON file
        print(json.dumps(devices_data, indent=4))
        # Store the results in a JSON file
        with open('gns3_devices.json', 'w') as file:
            json.dump(devices_data, file, indent=4)

    else:
        print("Authentication failed. No token received.")

except json.decoder.JSONDecodeError as e:
    print("Error decoding JSON response from GNS3 server:", e)