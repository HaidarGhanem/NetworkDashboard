import sys
from netmiko import ConnectHandler

def apply_eigrp(router_ip, username, password, networks, as_number):
    try:
        # Define the router connection details
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        # Connect to the router
        net_connect = ConnectHandler(**router)
        net_connect.enable()  # Enable privileged mode
        net_connect.config_mode()  # Enter configuration mode

        # Define the EIGRP configuration commands
        config_commands = [
            "router eigrp {}".format(as_number),
            "network {} 0.0.0.0".format(networks),
            "no auto-summary"
        ]

        # Apply the EIGRP configuration commands
        output = net_connect.send_config_set(config_commands)
        # print(output)

        net_connect.exit_config_mode()  # Exit configuration mode
        net_connect.send_command("write memory")  # Save the configuration
        net_connect.disconnect()  # Disconnect from the router
    except: 
        print("EIGRP configuration applied successfully.")

def disable_eigrp(router_ip, username, password, as_number):
    try:
        # Define the router connection details
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        # Connect to the router
        net_connect = ConnectHandler(**router)
        net_connect.enable()  # Enable privileged mode

        # Send the command to disable EIGRP
        config_commands = [
            "no router eigrp {}".format(as_number)
        ]

        output = net_connect.send_config_set(config_commands)
        # print(output)

        net_connect.send_command("write memory")  # Save the configuration
        net_connect.disconnect()  # Disconnect from the router
    except:
        print("EIGRP configuration disabled successfully.")

if __name__ == "__main__":

    if len(sys.argv) == 5:
        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        as_number = sys.argv[4]
        # Disable EIGRP
        disable_eigrp(router_ip, username, password ,as_number)
        
    else:
        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        networks = sys.argv[4]
        as_number = sys.argv[5]
        # Apply EIGRP configuration
        apply_eigrp(router_ip, username, password, networks, as_number)