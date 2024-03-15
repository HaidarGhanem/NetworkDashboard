import sys
from netmiko import ConnectHandler

def interface_action(router_ip, username, password, interface, action):
    # Define the router details
    router = {
        "device_type": "cisco_ios",
        "host": router_ip,
        "username": username,
        "password": password
    }

    # Define the interface configuration commands based on the action
    if action == "shutdown":
        config_commands = [f"interface {interface}", "shutdown", "exit"]
        success_message = f"Interface {interface} has been shut down successfully."
    elif action == "no shutdown":
        config_commands = [f"interface {interface}", "no shutdown", "exit"]
        success_message = f"Interface {interface} has been brought up successfully."
    else:
        print("Invalid action! Please use 'shutdown' or 'no shutdown'")
        return

    try:
        # Connect to the router
        with ConnectHandler(**router) as net_connect:
            # Enter privilege mode (if required)
            net_connect.enable()
            # Send the command to shut down or bring up the specified interface
            output = net_connect.send_config_set(config_commands)
            print(success_message)
    except Exception as e:
        print(f"Failed to connect to the router: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print("Insufficient arguments! Usage: python script.py <router_ip> <username> <password> <interface> <action>")
        print("Valid actions: 'shutdown' or 'no shutdown'")
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    interface = sys.argv[4]
    action = sys.argv[5]

    interface_action(router_ip, username, password, interface, action)