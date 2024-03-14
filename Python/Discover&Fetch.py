#1. It dynamically discovers devices in a GNS3 network topology using the NAPALM library.
#2. It connects to each discovered device using the Netmiko library.
#3. For each device, it retrieves the hostname and the IP addresses of all interfaces.
#4. It stores this information in a dictionary called `topology_info`.
#5. Finally, it prints the collected information for each device, including the hostname and the details of each interface.


import json
from netmiko import ConnectHandler

def discover_devices():
    # Specify the GNS3 server details
    gns3_host = '127.0.0.1'
    gns3_port = 3080

    # Discover devices using Netmiko
    devices = []
    try:
        router = {
            'device_type': 'cisco_ios',
            'ip': gns3_host,
            'username': 'admin',
            'password': 'admin',
            'port': gns3_port,
        }
        devices.append(router)

    except Exception as e:
        print(f"Error discovering devices: {str(e)}")

    return devices

def get_topology_info(devices):
    topology_info = {}

    for device in devices:
        try:
            # Connect to the device
            net_connect = ConnectHandler(**device)

            # Get device's hostname
            output = net_connect.send_command('show run | inc hostname')
            hostname = output.split()[1]

            # Get all interfaces and their IP addresses
            output = net_connect.send_command('show ip interface brie')
            interfaces = output.split('\n')[1:-1]  # Exclude the header and last empty element

            device_info = {
                'hostname': hostname,
                'interfaces': {}
            }

            for interface in interfaces:
                parts = interface.split()
                interface_name = parts[0]
                ip_address = parts[1]
                device_info['interfaces'][interface_name] = ip_address

            topology_info[device['ip']] = device_info

            # Disconnect from the device
            net_connect.disconnect()

        except Exception as e:
            print(f"Error connecting to {device['ip']}: {str(e)}")

    return topology_info

def save_topology_info(topology_info, file_path):
    with open(file_path, 'w') as file:
        json.dump(topology_info, file)

def load_topology_info(file_path):
    with open(file_path, 'r') as file:
        topology_info = json.load(file)
    return topology_info

# Main entry point
devices = discover_devices()
topology_info = get_topology_info(devices)
file_path = 'topology_info.json'
save_topology_info(topology_info, file_path)

# To load the saved topology_info from file:
loaded_topology_info = load_topology_info(file_path)