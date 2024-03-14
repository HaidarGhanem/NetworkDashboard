import sys
from netmiko import ConnectHandler

def get_hardware_info(router_ip, username, password):
    # Define the router details
    router = {
        "device_type": "cisco_ios",
        "host": router_ip,
        "username": username,
        "password": password,
    }

    # Connect to the router
    net_connect = ConnectHandler(**router)

    # Enter privilege mode (if required)
    net_connect.enable()

    # Send command to retrieve hardware information
    output_inventory = net_connect.send_command("show inventory")

    # Send command to retrieve CPU information
    #output_cpu = net_connect.send_command("show processes cpu")

    # Send command to retrieve memory statistics
    output_memory = net_connect.send_command("show memory statistics")

    # Disconnect from the router
    net_connect.disconnect()

    return {
        "Hardware": output_inventory,
        "Memory": output_memory
    }

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Insufficient arguments! Usage: python script.py <router_ip> <username> <password>")
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]

    device_info = get_hardware_info(router_ip, username, password)

    print("Hardware Information:")
    print(device_info["Hardware"])
    print("\nMemory Statistics:")
    print(device_info["Memory"])