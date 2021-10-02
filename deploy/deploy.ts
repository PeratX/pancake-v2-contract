import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = await hre.ethers.getNamedSigner('deployer')
  const { deploy } = hre.deployments

  const factoryDep = await deploy('PancakeFactory', {
    from: deployer.address,
    args: [deployer.address],
    log: true,
  });

  const weth = await deploy('WETH9', {
    from: deployer.address,
    log: true
  })

  await deploy('PancakeRouter', {
    from: deployer.address,
    args: [factoryDep.address, weth.address],
    log: true
  });

  return true
};

func.tags = ['factory', 'local', 'bsc']
func.id = "bsc_factory"
export default func;