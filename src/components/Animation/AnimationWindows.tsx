import {useState} from 'react'
import { Janela } from './styles'
import JanelaMoldura from "../../assets/JanelaMoldura.png"
function AnimationWindows() {
    const [valuex, setValuex] = useState<number>(0);

    window.addEventListener("mousemove", (e) => { if(e.screenY < 492 && e.screenY > 268 ){setValuex(e.screenY)}});

    const [imageLoading, setImageLoading] = useState(false)

    const ViewImg = () =>{

      setImageLoading(true)

    }

  return (
    
    <Janela valuex={valuex} >
        <img onLoad={ViewImg} src={JanelaMoldura} alt="janela" />

        {
          imageLoading && 
          <>
    <div>
        <svg
          viewBox="0 0 1421 1873"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path id="path1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1232.75 2787.4C1148.06 2727.93 1185.72 2807.75 1113.08 2780.62C1058.15 2760.11 1068.25 2705.21 1036.26 2686.56C1011.34 2672.03 967.087 2750.02 955.116 2768.4C931.478 2804.7 893.445 2825.92 873.915 2857.85L788.516 2969.23L696.862 2856.87C673.51 2825.26 654.839 2828.05 629.892 2790.17C601.276 2746.72 559.992 2734.95 556.079 2729.73C524.537 2687.66 512.396 2725.76 487.018 2755.37C466.017 2779.87 441.607 2733.27 415.108 2714.19C356.746 2672.17 380.19 2694.89 334.271 2722.77C285.533 2752.36 276.846 2714.07 249.269 2692.44C154.709 2618.27 166.203 2660.83 83.3976 2710.11C55.3404 2721.81 31.8009 2763.5 0 2797.32V3813.84H1420.84V2872.99L1232.75 2787.4V2787.4Z"
            fill="#B9FFCC"
          />
          <path id="path2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1420.84 3813.84H0V0H1420.84V3813.84Z"
            fill="url(#paint0_linear_6_31)"
          />
          <path id="path3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1420.84 2913.18C1375.02 2911.92 1324.08 2915.81 1310.44 2926.34C1239.09 2939.43 1155.12 2900.99 1092.86 2876.67C1046.14 2858.43 958.648 2940.47 914.128 2954.14C782.41 2994.63 701.587 2728.02 580.627 2907.4C545.301 2959.78 503.973 2941.87 462.032 2985.65C427.747 3021.45 323.1 3036.99 275.981 3004.24C103.714 2723.37 90.1708 2779.01 3.55675 2907.56C2.54456 2928.73 1.34546 2950.97 0 2974.14V3813.84H1420.84V2913.18Z"
            fill="#8AD1F1"
          />
          <path id="path4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 3089.34C47.5127 3084.7 144.94 3085.49 164.632 3094.35C235.98 3101.98 319.952 3079.57 382.214 3065.39C428.933 3054.76 516.422 3102.59 560.942 3110.56C692.658 3134.17 773.482 2978.73 894.443 3083.31C929.769 3113.85 971.099 3103.41 1013.04 3128.93C1047.32 3149.8 1046.99 3136.97 1094.11 3117.87C1285.67 3105.09 1356.4 3043.57 1420.84 3056.43V3611.78H0V3089.34V3089.34Z"
            fill="#5DBFE9"
          />
          <path id="path5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1420.84 3174.53C1400.57 3183.55 1380.2 3195.08 1359.82 3213.29C1309.17 3225.45 1247.73 3198.95 1202.31 3182.47C1168.24 3170.11 1108.39 3235.03 1076.98 3246.79C984.046 3281.61 917.053 3082.07 836.57 3221.82C813.063 3262.64 769.477 3286.62 740.94 3321.12C717.612 3349.32 721.209 3358.04 686.349 3334.7C664.756 3320.24 639.265 3312.49 622.543 3300.2C581.962 3270.36 570.077 3203.8 511.783 3224.37C464.536 3241.04 445.391 3296.4 383.63 3287.02L338.198 3219.61C313.744 3166.9 294.078 3112.63 253.85 3069.51C186.73 2997.57 162.762 3028.55 110.988 3078.91L73.8418 3021.7L72.6039 3020.33C58.5092 3005.72 35.1214 2948.79 10.6879 2947.65C7.18933 2947.49 3.60789 2948.49 0 2950.36V3893.78H1420.84V3174.53V3174.53Z"
            fill="url(#paint1_linear_6_31)"
          />
          <path id="path6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1420.84 3277.85C1359.88 3345.35 1294.84 3330.65 1229.77 3388.62C1182.47 3399.94 1125.08 3375.26 1082.67 3359.92C1050.84 3348.41 994.947 3408.86 965.608 3419.81C878.809 3452.23 816.242 3266.44 741.072 3396.56C684.7 3494.15 633.638 3537.32 541.178 3469.53C503.276 3441.75 492.177 3379.78 437.729 3398.93C393.607 3414.45 375.723 3466 318.044 3457.27L275.61 3394.51C252.769 3345.42 234.402 3294.9 196.828 3254.75C134.144 3187.77 111.756 3216.6 63.4008 3263.49L28.7079 3210.23L27.5529 3208.95C20.4782 3201.64 10.8942 3182.95 0 3167.06V3813.84H1420.84V3277.85Z"
            fill="url(#paint2_linear_6_31)"
          />
          <path id="path7"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1420.84 3196.32C1368.09 3166.33 1318.06 3167.83 1287.43 3229.92C1258.47 3288.63 1236.68 3328.35 1220.68 3392.65C1198.93 3480.02 1182.68 3491.48 1106.2 3451.67C1043.13 3418.83 1043.08 3527.04 1021.23 3566.62C987.906 3626.99 959.066 3629.04 929.624 3708.37C900.869 3785.85 850.311 3778 805.531 3716.77C782.812 3685.7 743.555 3585.48 714.376 3578.9C666.121 3568.01 649.72 3666.42 572.917 3605.26C523.909 3566.24 497.899 3524.66 457.058 3482.46C410.975 3434.85 380.691 3430.78 338.75 3366.62C306.983 3318.03 269.25 3266.03 198.845 3300.34C135.82 3331.06 102.238 3374.17 57.5622 3286.76C39.8243 3252.06 17.9195 3224.02 0 3192.82V5572.14L1420.84 5567.93V3196.32V3196.32Z"
            fill="url(#paint3_linear_6_31)"
          />
          <path id="path8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M724.782 2572.29C715.493 2546.75 696.332 2526.4 672.05 2517C632.128 2501.55 613.618 2511.88 580.816 2523.94C559.426 2491.93 511.363 2460.08 447.121 2462.81C387.268 2465.31 346.908 2498.11 324.969 2532.54C285.833 2517.13 259.675 2515.62 233.778 2557.35C223.858 2551.74 216.946 2543.37 198.473 2548.08C185.75 2551.32 178.971 2559.7 176.898 2572.97L724.782 2572.29V2572.29Z"
            fill="#EBF2F2"
          />
          <path id="path9"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M961.212 2357.54C894.145 2317.73 877.768 2361 861.282 2372.44C834.832 2354.41 802.648 2360.17 797.432 2389.84L1229.5 2389.95C1226.5 2373.23 1216.83 2361.96 1203.87 2356.02C1180.98 2345.52 1172.15 2353.19 1152.7 2358.38C1133.22 2319.49 1060.57 2293.61 1001.34 2324.2C979.914 2335.27 976.405 2344.04 961.212 2357.54V2357.54Z"
            fill="#EBF2F2"
          />
          
          <path id="path11" fill-rule="evenodd" clip-rule="evenodd" d="M708.081 2864.6C695.15 2858.79 629.425 2791.77 521.227 2807.79C450.434 2818.27 392.867 2854.39 364.314 2899.38C338.216 2890.44 323.361 2876.62 286.522 2888.96C266.525 2895.65 241.81 2913.59 238.376 2934.06L1167.91 2933.75C1169.48 2915.14 1151.59 2897.09 1135.86 2890.18C1107.08 2877.51 1090.95 2889.98 1073.04 2897.89C1067.65 2892.46 1065.52 2882.84 1061.87 2876.08C1056.82 2866.7 1053.86 2861.84 1047.8 2853.39C972.429 2748.41 807.748 2742.6 723.43 2844.21C718.058 2850.69 714.145 2857.87 708.081 2864.6V2864.6Z" fill="#EBF2F2"/>

          <path id="path12"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M429.032 1687.84C361.965 1648.03 345.589 1691.3 329.103 1702.74C302.652 1684.71 270.468 1690.46 265.252 1720.14L697.324 1720.25C694.321 1703.53 684.654 1692.25 671.692 1686.31C648.803 1675.82 639.968 1683.49 620.517 1688.68C601.042 1649.79 528.388 1623.91 469.161 1654.5C447.735 1665.57 444.225 1674.34 429.032 1687.84V1687.84Z"
            fill="#EBF2F2"
          />
          <path id="path13"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M827.524 1255.14C814.593 1249.33 748.868 1182.31 640.67 1198.33C569.877 1208.81 512.31 1244.93 483.757 1289.93C457.659 1280.99 442.804 1267.16 405.965 1279.5C385.968 1286.2 361.253 1304.13 357.819 1324.61L1287.36 1324.29C1288.92 1305.68 1271.03 1287.64 1255.31 1280.72C1226.52 1268.06 1210.4 1280.52 1192.49 1288.44C1187.09 1283.01 1184.96 1273.38 1181.32 1266.62C1176.26 1257.25 1173.3 1252.38 1167.24 1243.94C1091.87 1138.96 927.191 1133.15 842.872 1234.75C837.501 1241.23 833.588 1248.42 827.524 1255.14V1255.14Z"
            fill="#EBF2F2"
          />
          <path id="path14"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M363.341 835.337C296.274 795.529 279.897 838.8 263.411 850.234C236.96 832.209 204.777 837.963 199.561 867.637L631.633 867.748C628.63 851.029 618.963 839.753 606 833.812C583.112 823.32 574.277 830.99 554.825 836.18C535.35 797.29 462.697 771.404 403.47 802C382.043 813.069 378.534 821.835 363.341 835.337V835.337Z"
            fill="#EBF2F2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_6_31"
              x1="823.378"
              y1="2362.83"
              x2="838.565"
              y2="133.192"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A3DBF3" />
              <stop offset="1" stopColor="#0A87BD" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6_31"
              x1="1047.03"
              y1="3160.66"
              x2="1242.26"
              y2="3794.64"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5DC98E" />
              <stop offset="1" stopColor="#8BE4AE" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_6_31"
              x1="724.491"
              y1="3473.49"
              x2="611.492"
              y2="4228.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#30AE6D" />
              <stop offset="1" stopColor="#8BE4AE" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_6_31"
              x1="124.557"
              y1="4633.59"
              x2="1471.27"
              y2="4520.8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#224241" />
              <stop offset="1" stopColor="#223131" />
            </linearGradient>
          </defs>
        </svg>

        </div>
          </>
        }
        
        
      </Janela>
  )
}

export default AnimationWindows
