import sys
import json
from netmiko import ConnectHandler

def apply_eigrp(router_ip, username, password, networks, as_number):
    try:
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        net_connect = ConnectHandler(**router)
        net_connect.enable()  
        net_connect.config_mode()  

        # EIGRP configuration commands
        config_commands = [
            "router eigrp {}".format(as_number),
            "network {} 0.0.0.0".format(networks),
            "no auto-summary"
        ]

        output = net_connect.send_config_set(config_commands)

        net_connect.exit_config_mode() 
        net_connect.send_command("write memory")
        net_connect.disconnect() 

        
    except:
        return json.dumps({"message": "EIGRP configuration applied successfully"})
        
def disable_eigrp(router_ip, username, password, as_number):
    try:
        router = {
            "device_type": "cisco_ios",
            "host": router_ip,
            "username": username,
            "password": password,
        }

        net_connect = ConnectHandler(**router)
        net_connect.enable()

        # Disable EIGRP
        config_commands = [
            "no router eigrp {}".format(as_number)
        ]

        output = net_connect.send_config_set(config_commands)
      
        net_connect.send_command("write memory")  
        net_connect.disconnect() 

        
    except:
        return json.dumps({"message": "EIGRP configuration disabled successfully"})

if __name__ == "__main__":
    if len(sys.argv) == 5:
        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        as_number = sys.argv[4]
        
        result = disable_eigrp(router_ip, username, password, as_number)
    else:
        router_ip = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        networks = sys.argv[4]
        as_number = sys.argv[5]

        result = apply_eigrp(router_ip, username, password, networks, as_number)

    print(result) 