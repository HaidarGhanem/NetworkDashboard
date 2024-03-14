import sys
from netmiko import ConnectHandler

def apply_rip(router_ip, username, password, networks):
    try:
        # Define the router details
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        # Connect to the router
        net_connect = ConnectHandler(**router)

        # Enable privilege mode (if required)
        net_connect.enable()

        # Apply RIP protocol configuration
        config_commands = [
            "router rip",
            "version 1",
            f"network {networks}",
            "no auto-summary",
        ]

        output = net_connect.send_config_set(config_commands)
        #print(output)
        
        # Save the configuration
        net_connect.send_command("write memory", expect_string=r'.*#')

        # Disconnect from the router
        net_connect.disconnect()
    except :
        print("RIP configuration applied successfully.")

def disable_rip(router_ip, username, password):
    try:
        # Define the router details
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        # Connect to the router
        net_connect = ConnectHandler(**router)

        # Enable privilege mode (if required)
        net_connect.enable()

        # Remove RIP protocol configuration
        config_commands = ["no router rip"]

        output = net_connect.send_config_set(config_commands)
        #print(output)

        # Save the configuration
        net_connect.send_command("write memory", expect_string=r'.*#')

        # Disconnect from the router
        net_connect.disconnect()
    except :
        print("RIP configuration disabled successfully.")

if __name__ == "__main__":
    if (len(sys.argv) < 4) or (len(sys.argv) > 5):
        print("Invalid number of arguments! Usage: python script.py <router_ip> <username> <password> [networks]")
        sys.exit(1)

    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]

    if len(sys.argv) == 5:
        networks = sys.argv[4]
        # Apply RIP configuration
        apply_rip(router_ip, username, password, networks)
    else:
        # Disable RIP
        disable_rip(router_ip, username, password)