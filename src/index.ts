export namespace TTPG {
    export namespace Template {
        export type File3D = `${string}.${"obj" | "fbx"}`;
        export type FileImage = `${string}.${"jpg" | "png" | "tga"}`;
        export type FilePDF = `${string}.pdf`;

        /* Data types */
        export type Color3 = { R: number; G: number; B: number };
        export type Color4 = { R: number; G: number; B: number; A: number };
        export type Vector3 = { X: number; Y: number; Z: Number };

        /* Enum types */
        export type CollisionType = "Regular" | "Ground" | "Penetrable";
        export type SurfaceType = "Plastic" | "Wood" | "Metal" | "Cardboard" | "Cloth" | "Glass" | "Silent";
        export type GroundAccessibility = "Nothing" | "Zoom" | "ZoomAndContext";

        export type CardModel = "Rounded" | "Square" | "Round" | "Hexagonal";

        export const SnapRotation = {
            NO_CHANGE: 0,
            NO_FLIP: 1,
            ROTATE_NO_FLIP: 2,
            ROTATE_UPRIGHT: 3,
            ROTATE_UPSIDE_DOWN: 4,
            UPRIGHT: 5,
            UPSIDE_DOWN: 6,
        } as const;

        export const SnapShape = {
            SPHERE: 0,
            CYLINDER: 1,
            BOX: 2,
        } as const;

        export const SnapFlipValidity = {
            ALWAYS: 0,
            UPRIGHT: 1,
            UPSIDE_DOWN: 2,
        } as const;

        /* Compound Types */
        export type SnapPoint = Vector3 & {
            Range: number;
            SnapRotation: (typeof SnapRotation)[keyof typeof SnapRotation];
            RotationOffset: 0;
            FlipValidity: (typeof SnapFlipValidity)[keyof typeof SnapFlipValidity];
            Tags: string[];
        } & (
                | {
                      Shape: (typeof SnapShape)["SPHERE"] | (typeof SnapShape)["CYLINDER"];
                  }
                | {
                      Shape: (typeof SnapShape)["BOX"];
                      SecondaryRange: number;
                  }
            );

        export type DieFace = Vector3 & {
            Name: string;
            Metadata: string;
        };

        export type ColliderModel = {
            Model: File3D;
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            Type: "Convex";
        };

        export type ColliderSphere = {
            Model: "";
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            Type: "Sphere";
            Radius: number;
        };

        export type ColliderShape = {
            Model: FileImage;
            ShapeAccuracy: number;
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            Type: "Convex";
            ConvexCollision: boolean;
        };

        export type Collider = ColliderModel | ColliderSphere | ColliderShape;

        export type LightSpot = {
            Offset: Vector3;
            Color: Color3;
            Intensity: number;
            Direction: Vector3;
            InnerAngle: number;
            OuterAngle: number;
        };

        export type LightPoint = {
            Offset: Vector3;
            Color: Color3;
            Intensity: number;
        };

        export type Light = LightSpot | LightPoint;

        export type Model3d = {
            Model: File3D;
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            Texture: string;
            NormalMap: string;
            ExtraMap: string;
            ExtraMap2: string;
            IsTransparent: boolean;
            CastShadow: boolean;
            IsTwoSided: boolean;
            UseOverrides: boolean;
            SurfaceType: SurfaceType;
        };

        export type Model2d = {
            Model: FileImage;
            ShapeAccuracy: number;
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            Texture: string;
            NormalMap: string;
            ExtraMap: string;
            ExtraMap2: string;
            IsTransparent: boolean;
            CastShadow: boolean;
            IsTwoSided: boolean;
            UseOverrides: boolean;
            SurfaceType: SurfaceType;
        };

        export type ModelMultistate = {
            Offset: Vector3;
            Scale: Vector3;
            Rotation: Vector3;
            NormalMap: FileImage | "";
            ExtraMap: FileImage | "";
            ExtraMap2: FileImage | "";
            IsTransparent: boolean;
            CastShadow: boolean;
            IsTwoSided: boolean;
            UseOverrides: boolean;
            SurfaceType: SurfaceType;
            UseCardModel: boolean;
            Indices: number[];
            Emissive: boolean;
        } & (
            | {
                  Model: CardModel;
              }
            | {
                  Model: FileImage;
                  ShapeAccuracy: number;
              }
        ) &
            (
                | {
                      Texture: FilePDF;
                  }
                | {
                      Texture: FileImage;
                      NumHorizontal: number;
                      NumVertical: number;
                      Emissive: boolean;
                      BackTexture: FileImage | "";
                      BackIndex: number;
                  }
            );

        /* Actual Types */

        export type Base = {
            GUID: string;
            Name: string;
            Metadata: string;
            CollisionType: CollisionType;
            Friction: number;
            Restitution: number;
            Density: number;
            SurfaceType: SurfaceType;
            Roughness: number;
            Metallic: number;
            PrimaryColor: Color3;
            SecondaryColor: Color3;
            Flippable: boolean;
            AutoStraighten: boolean;
            ShouldSnap: boolean;
            ScriptName: string;
            Models: (Model3d | Model2d)[];
            Collision: Collider[];
            Lights: Light[];
            SnapPointsGlobal: boolean;
            SnapPoints: SnapPoint[];
            ZoomViewDirection: Vector3;
            GroundAccessibility: GroundAccessibility;
            Tags: string[];
        };

        export type Generic = Base & {
            Type: "Generic";
            Blueprint: "";
        };

        export type Board = Base & {
            Type: "Generic";
            Blueprint: "Blueprints/Board.json";
        };

        export type Dice = Base & {
            Type: "Dice";
            Blueprint: "";
            Faces: DieFace[];
        };

        export type Card = Base & {
            Type: "Card";
            Blueprint: "";
            Models: never[];
            Collision: never[];
            FrontTexture: string;
            BackTexture: string;
            HiddenTexture: string;
            BackIndex: number;
            HiddenIndex: number;
            NumHorizontal: number;
            NumVertical: number;
            Width: number;
            Height: number;
            Thickness: number;
            HiddenInHand: boolean;
            CanStack: boolean;
            UsedWithCardHolders: boolean;
            UsePrimaryColorForSide: boolean;
            FrontTextureOverrideExposed: boolean;
            AllowFlippedInStack: boolean;
            MirrorBack: boolean;
            EmissiveFront: boolean;
            Indices: number[];
            CardNames: {
                [key: `${number}`]: string;
            };
            CardMetadata: {
                [key: `${number}`]: string;
            };
            CardTags: {
                [key: `${number}`]: string[];
            };
        } & (
                | {
                      Model: CardModel;
                  }
                | {
                      Model: FileImage;
                      ConvexCollision: boolean;
                      ShapeAccuracy: number;
                  }
            );

        export type CardHolder = Base & {
            Type: "Card Holder";
            Blueprint: "";
            CardsCenter: Vector3;
            CardsWidth: number;
            MaxCards: number;
            MaxCardHeight: number;
        };

        export type Container = Base & {
            Type: "Container";
            Blueprint: "";
        };

        export type CardboardFigure = Base & {
            Type: "Cardboard Figure";
            Blueprint: "Blueprints/Figure.json";
            FrontTexture: string;
            BackTexture: string;
            FrontExtraMap: string;
            BackExtraMap: string;
            FigureWidth: number;
            FigureHeight: number;
            FigureZOffset: number;
            Collide: boolean;
        } & (
                | {
                      UseAlpha: true;
                      ShapeAccuracy: number;
                  }
                | {
                      UseAlpha: false;
                  }
            );

        export type MultistateObject = Base & {
            Type: "Multistate Object";
            Blueprint: "";
            MultistateModels: ModelMultistate[];
            Circular: boolean;
        };

        export type Table = Omit<Base, "CollisionType"> & {
            Type: "Table";
            CollisionType: "Static";
            Blueprint: "";
        };
    }
}
