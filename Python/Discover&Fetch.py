
import json
from netmiko import ConnectHandler

def discover_devices():
    
    gns3_host = '127.0.0.1'
    gns3_port = 3080

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
            net_connect = ConnectHandler(**device)

            output = net_connect.send_command('show run | inc hostname')
            hostname = output.split()[1]

            output = net_connect.send_command('show ip interface brie')
            interfaces = output.split('\n')[1:-1] 

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

devices = discover_devices()
topology_info = get_topology_info(devices)
file_path = 'topology_info.json'
save_topology_info(topology_info, file_path)

loaded_topology_info = load_topology_info(file_path)