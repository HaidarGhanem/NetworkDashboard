import sys
from netmiko import ConnectHandler

def apply_ospf(router_ip, username, password, networks, interface, area):
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

        # Define OSPF configuration commands
        config_commands = [
            "router ospf 1",                     # Enter OSPF configuration mode with process ID 1
            f"network {networks} {area}",        # Specify the network with the area ID
            "passive-interface default",         # Set all interfaces as passive by default
            "no auto-summary"                    # Disable automatic network summarization
        ]

        if area != "0":
            config_commands.append(f"network {networks} area {area}")  # Add network with specified area

        config_commands.append(f"no passive-interface {interface}")      # Enable OSPF on the specified interface

        output = net_connect.send_config_set(config_commands)
        # print(output)

        # Save the configuration
        net_connect.exit_config_mode()
        net_connect.send_command("write memory")

        # Disconnect from the router
        net_connect.disconnect()
    except:
        print("OSPF configuration applied successfully.")

def disable_ospf(router_ip, username, password):
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

        # Disable OSPF protocol
        config_commands = ["no router ospf 1"]  # Remove OSPF process with ID 1

        output = net_connect.send_config_set(config_commands)
        #print(output)

        # Save the configuration
        net_connect.exit_config_mode()
        net_connect.send_command("write memory")

        # Disconnect from the router
        net_connect.disconnect()
    except:
        print("OSPF configuration disabled successfully.")

if __name__ == "__main__":
    if len(sys.argv) >=7:

        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        networks = sys.argv[4]
        interface = sys.argv[5]
        area = sys.argv[6]
        apply_ospf(router_ip, username, password, networks, interface, area)

    else:
        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        disable_ospf(router_ip, username, password)