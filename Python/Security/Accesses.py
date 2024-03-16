from netmiko import ConnectHandler
import sys

def configure_acl(router_ip, username, password, permit_ips, denied_ips):
    
    router = {
        'device_type': 'cisco_ios',
        'host': router_ip,
        'username': username,
        'password': password
    }

    net_connect = ConnectHandler(**router)

    for ip in permit_ips:
        config_commands = [
            'ip access-list standard PERMIT_ACL',
            f'permit {ip}'
        ]
        output = net_connect.send_config_set(config_commands)
        if 'config' in output.lower() or 'error' in output.lower():
            print(f'Permit configuration for {ip} - FAILED')
        else:
            print(f'Permit configuration for {ip} - SUCCESS')

    for ip in denied_ips:
        config_commands = [
            'ip access-list standard DENY_ACL',
            f'deny {ip}'
        ]
        output = net_connect.send_config_set(config_commands)
        if 'config' in output.lower() or 'error' in output.lower():
            print(f'Deny configuration for {ip} - FAILED')
        else:
            print(f'Deny configuration for {ip} - SUCCESS')

    net_connect.disconnect()

if len(sys.argv) < 6:
    print("needed : python script.py <router_ip> <username> <password> <permit_ips> <denied_ips>")
    sys.exit(1)

router_ip = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
permit_ips = sys.argv[4].split(',')
denied_ips = sys.argv[5].split(',')

configure_acl(router_ip, username, password, permit_ips, denied_ips)