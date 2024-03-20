import sys
import json
from netmiko import ConnectHandler

def get_hardware_info(router_ip, username, password):
    
    router = {
        "device_type": "cisco_ios",
        "host": router_ip,
        "username": username,
        "password": password,
    }

    net_connect = ConnectHandler(**router)

    net_connect.enable()

    output_inventory = net_connect.send_command("show inventory")

    output_memory = net_connect.send_command("show memory statistics")

    for line in output_memory.splitlines():
        if "Processor" in line:
            total_memory = int(line.split()[2])
            used_memory = int(line.split()[3])
            break

    memory_usage_percentage = (used_memory / total_memory) * 100

    net_connect.disconnect()

    return {
        "Hardware": output_inventory,
        "Memory": memory_usage_percentage
    }

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("needed : python script.py <router_ip> <username> <password>")
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]

    device_info = get_hardware_info(router_ip, username, password)

    output_json = {
        "Hardware Information": device_info["Hardware"],
        "Memory Usage Percentage": "{}%".format(device_info["Memory"])
    }

    print(json.dumps(output_json, indent=4))