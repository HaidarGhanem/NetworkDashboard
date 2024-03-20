import sys
import json
from netmiko import ConnectHandler

def conn(src_ip, dst_ip, username, password):
    try:
        router = {
            "device_type": "cisco_ios",
            "host": src_ip,
            "username": username,
            "password": password,
        }

        net_connect = ConnectHandler(**router)
        net_connect.enable()

        config_commands = [
            "exit",
            f"ping {dst_ip}"
        ]

        output = net_connect.send_config_set(config_commands)

        parsed_output = output.splitlines()
        success_rate_line = [line.strip() for line in parsed_output if "Success rate" in line][0]
        
        net_connect.disconnect()

        return json.dumps({"success_rate": success_rate_line})
    except Exception as e:
        return json.dumps({"error": f"Error occurred: {str(e)}"})

if __name__ == "__main__":
    if len(sys.argv) < 5:
        error_message = "needed : python script.py <src_ip> <dst_ip> <username> <password>"
        print(json.dumps({"error": error_message}))
        sys.exit(1)

    src_ip = sys.argv[1]
    dst_ip = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]
    
    result = conn(src_ip, dst_ip, username, password)
    
    print(result)  