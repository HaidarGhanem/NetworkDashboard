import sys
from netmiko import ConnectHandler

def apply_ospf(router_ip, username, password, networks, interface, area):
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

        #OSPF config
        config_commands = [
            "router ospf 1",                     
            f"network {networks} {area}",       
            "passive-interface default",        
            "no auto-summary"    
        ]

        if area != "0":
            config_commands.append(f"network {networks} area {area}") 

        config_commands.append(f"no passive-interface {interface}") 

        output = net_connect.send_config_set(config_commands)

        net_connect.exit_config_mode()
        net_connect.send_command("write memory")

        net_connect.disconnect()
    except:
        print("OSPF configuration applied successfully.")

def disable_ospf(router_ip, username, password):
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

        # Disable OSPF
        config_commands = ["no router ospf 1"]

        output = net_connect.send_config_set(config_commands)

        net_connect.exit_config_mode()
        net_connect.send_command("write memory")

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