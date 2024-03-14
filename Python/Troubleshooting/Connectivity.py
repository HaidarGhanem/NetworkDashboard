import sys
from netmiko import ConnectHandler

def conn(src_ip, dst_ip, username, password):
    try:
        # Define the router details
        router = {
            "device_type": "cisco_ios",
            "host": src_ip,
            "username": username,
            "password": password,
        }

        # Connect to the router
        net_connect = ConnectHandler(**router)

        # Enable privilege mode (if required)
        net_connect.enable()

        # Ping
        config_commands = [
            "exit",
            f"ping {dst_ip}"
        ]

        output = net_connect.send_config_set(config_commands)
        print(output)
        
        # Disconnect from the router
        net_connect.disconnect()
    except :
        print("Pinging was unsuccessfully.")

if __name__ == "__main__":

    src_ip = sys.argv[1]
    dst_ip = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]
    conn(src_ip, dst_ip, username, password)
