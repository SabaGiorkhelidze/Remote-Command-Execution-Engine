export const normalizePorts = (ports?: Record<string, string>): Record<string, Array<{ HostPort: string }>> | undefined => {
    if (!ports) return undefined;

    const bindings: Record<string, Array<{ HostPort: string }>> = {};

    for (const [containerPort, hostPort] of Object.entries(ports)) {
        bindings[containerPort] = [{ HostPort: hostPort }];
    }

    return bindings;
};
