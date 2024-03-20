from netmiko import ConnectHandler
import sys
import json

def configure_acl(router_ip, username, password, permit_ips, denied_ips):
    try:
        router = {
            'device_type': 'cisco_ios',
            'host': router_ip,
            'username': username,
            'password': password
        }

        net_connect = ConnectHandler(**router)

        acl_results = {}
        for ip in permit_ips:
            config_commands = [
                'ip access-list standard PERMIT_ACL',
                f'permit {ip}'
            ]
            output = net_connect.send_config_set(config_commands)
            acl_results[ip] = "SUCCESS" if 'error' not in output.lower() else "FAILED"

        for ip in denied_ips:
            config_commands = [
                'ip access-list standard DENY_ACL',
                f'deny {ip}'
            ]
            output = net_connect.send_config_set(config_commands)
            acl_results[ip] = "SUCCESS" if 'error' not in output.lower() else "FAILED"

        net_connect.disconnect()

        return json.dumps(acl_results)

    except Exception as e:
        return json.dumps({"error": f"Error configuring ACLs on {router_ip}: {str(e)}"})

if len(sys.argv) < 6:
    print("usage: python script.py <router_ip> <username> <password> <permit_ips> <denied_ips>")
    sys.exit(1)

router_ip = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
permit_ips = sys.argv[4].split(',')
denied_ips = sys.argv[5].split(',')

result = configure_acl(router_ip, username, password, permit_ips, denied_ips)
print(result) 