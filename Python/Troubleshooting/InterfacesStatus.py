import sys
import json
from netmiko import ConnectHandler

def interface_action(router_ip, username, password, interface, action):
    router = {
        "device_type": "cisco_ios",
        "host": router_ip,
        "username": username,
        "password": password
    }

    if action == "shutdown":
        config_commands = [f"interface {interface}", "shutdown", "exit"]
        success_message = f"Interface {interface} has been shut down successfully."
    elif action == "no shutdown":
        config_commands = [f"interface {interface}", "no shutdown", "exit"]
        success_message = f"Interface {interface} has been brought up successfully."
    else:
        return json.dumps({"error": "Invalid action! Please use 'shutdown' or 'no shutdown'"})

    try:
        with ConnectHandler(**router) as net_connect:
            net_connect.enable()
            output = net_connect.send_config_set(config_commands)
            return json.dumps({"message": success_message})
    except Exception as e:
        return json.dumps({"error": f"Failed to connect to the router: {e}"})

if __name__ == "__main__":
    if len(sys.argv) < 6:
        error_message = "needed : python script.py <router_ip> <username> <password> <interface> <action>"
        error_message += "\nValid actions: 'shutdown' or 'no shutdown'"
        print(json.dumps({"error": error_message}))
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    interface = sys.argv[4]
    action = sys.argv[5]

    result = interface_action(router_ip, username, password, interface, action)
    
    print(result) 